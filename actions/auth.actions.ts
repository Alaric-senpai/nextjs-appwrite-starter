"use server";
import { actionClient } from "./safe-action";
import { RegisterformSchema, LoginformSchema } from "../lib/form-schema";
import { createAdminSession, createClientSession } from "@/server/clients";
import { ID, Query, Client, Account, OAuthProvider } from "node-appwrite";
import { appwritecfg } from "@/config/appwrite.config";
import { setSessionCookie, setRoleCookie, deleteSessionCookie, deleteRoleCookie, getRoleCookie, getUserSessionCookie } from "@/server/cookies";
import { createUserRecord, getUserRole } from "./user.actions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";
import { UserRole } from "@/lib/utils";

export const RegisterserverAction = actionClient
  .inputSchema(RegisterformSchema)
  .action(async ({ parsedInput }) => {
    const { email, password, name } = parsedInput;

    try {
      // 1. Create Admin Session
      const { accounts } = await createAdminSession();

      // 2. Create Auth User
      const user = await accounts.create(ID.unique(), email, password, name);

      // 3. Create User Document (Delegated to user.actions)
      await createUserRecord(user.$id, email, name);

      return {
        success: true,
        message: "Account created successfully",
      };
    } catch (error: any) {
      console.error("Registration Error:", error);
      throw new Error(error?.message || "Failed to create account");
    }
  });


export const LoginserverAction = actionClient
  .inputSchema(LoginformSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;

    try {
      // 1. Use admin session to create email password session
      // Using admin session allows us to create session on behalf of user
      // But simpler is to use Client SDK on client side or createSession here
      // Appwrite Admin SDK cannot createEmailPasswordSession for a user directly without being that user context usually?
      // Actually Admin API can create session for user if using API Key? No, usually Client API does that.
      // But node-appwrite with API Key has limited session creation capabilities for users directly in this way unless we use `createSession` with userId/secret or token.
      // However, `createEmailPasswordSession` is available on Account service which usually requires User Session.
      // Let's check `createAdminSession` returns `Account` service initialized with API Key.
      // API Key based Account service operates as "Application" or "Admin" but `createEmailPasswordSession` typically logs in the *current* client.
      // In server-side actions, we are the "client" to Appwrite.

      // CORRECT APPROACH FOR SERVER ACTION LOGIN:
      // We can't easily "log in" a user via Server Action using just Email/Password with Admin SDK to get a session *cookie* for the browser directly.
      // The browser needs the cookie.
      // Option A: Client-side login using Appwrite Web SDK (easiest, handles cookies automatically).
      // Option B: Server-side login:
      //    1. Use Admin SDK to `createEmailPasswordSession`? No, that creates session for the *server*.
      //    2. Actually, Appwrite Node SDK `account.createEmailPasswordSession` works if we treat the server as the client, but we need to pass the session to the browser.
      //    The `createEmailPasswordSession` returns a Session object containing `secret`.
      //    We can set this `secret` as a cookie `a_session_<project_id>`.

      const { accounts } = await createAdminSession();

      // We CANNOT use Admin Session to create EmailPasswordSession for a user in the way we think.
      // Admin API keys generally don't support `createEmailPasswordSession` to authenticate *as* a user.
      // BUT `node-appwrite` allows it if we don't set a session?
      // Wait, `createEmailPasswordSession` is for the *current* user. If we use API Key, who is the current user? No one.

      // REVISION: We need to use a clean Client (no session, no API key?) or just use the Admin Client?
      // Actually, standard practice for Server Action Login with Appwrite:
      // Use `databases.listDocuments` to verify credentials? No, insecure.

      // Correct way with Appwrite + Next.js Server Actions:
      // 1. Initialize a Client WITHOUT API Key (acting as public client).
      // 2. Call `account.createEmailPasswordSession(email, password)`.
      // 3. Get the session secret.
      // 4. Set the cookie.

      const client = new Client()
        .setEndpoint(appwritecfg.project.endpoint)
        .setProject(appwritecfg.project.id);
        // NO API KEY here for login!

      const account = new Account(client);
      const session = await account.createEmailPasswordSession(email, password);

      // 3. Set Session Cookie with expiration
      await setSessionCookie(session.secret);

      // 4. Fetch User Role and set cookie
      const role = await getUserRole(session.userId);
      await setRoleCookie(role as UserRole);

      return {
        success: true,
        message: "Login successful",
        data: {
          userId: session.userId,
          expire: session.expire,
          role: role as UserRole
        }
      };
    } catch (error: any) {
      console.error("Login Error:", error);
      throw new Error(error?.message || "Invalid credentials");
    }
  });

const OAuthSchema = z.object({
  provider: z.enum(["google", "github", "apple", "microsoft", "facebook"])
});

export const OAuthServerAction = actionClient
  .inputSchema(OAuthSchema)
  .action(async ({ parsedInput }) => {
    const { provider } = parsedInput;
    const origin = (await headers()).get("origin");

    try {
      // Construct Appwrite OAuth2 URL manually to control redirect flow
      // This is the correct way to initiate OAuth2 flow to get the redirect URL
      const target = new URL(`${appwritecfg.project.endpoint}/account/sessions/oauth2/${provider}`);
      target.searchParams.set("project", appwritecfg.project.id);
      target.searchParams.set("success", `${origin}/oauth`);
      target.searchParams.set("failure", `${origin}/fail?error=oauth_failed`);

      return {
        success: true,
        data: { redirectUrl: target.toString() }
      };
    } catch (error: any) {
      console.error("OAuth Initialization Error:", error);
      throw new Error(error?.message || "Failed to initialize OAuth");
    }
  });



export const Logout = async () => {
  try {
    const { accounts } = await createClientSession();

    await accounts.deleteSession({
      sessionId: "current"
    });

    await deleteSessionCookie();
    await deleteRoleCookie();

    return {
      success: true,
      message: "Logged out successfully"
    };
  } catch (error: any) {
    console.error("Logout Error:", error);

    // Even if Appwrite session deletion fails, clear local cookies
    await deleteSessionCookie();
    await deleteRoleCookie();

    return {
      success: false,
      message: error?.message || "Failed to logout",
    };
  }
};


/**
 * Handle OAuth callback - called from the OAuth route handler
 */
export const handleOauthCallback = async (secret: string, userId: string) => {
  try {
    // 1. Verify session by creating a client with the secret
    const client = new Client()
        .setEndpoint(appwritecfg.project.endpoint)
        .setProject(appwritecfg.project.id)
        .setSession(secret);

    const account = new Account(client);
    const user = await account.get();

    if (user.$id !== userId) {
        throw new Error("User ID mismatch");
    }

    // 2. Set Cookies
    await setSessionCookie(secret);

    // 3. Check/Create DB Record (using Admin Session)
    const { tables, accounts } = await createAdminSession();

    try {
        const userDocs = await tables.listRows({
          databaseId: appwritecfg.databaseId,
          tableId: appwritecfg.tables.users,
          queries: [Query.equal("userId", userId)]
        });

        // If user record doesn't exist, create one
        if (!userDocs.rows || userDocs.rows.length === 0) {
          await createUserRecord(userId, user.email || '', user.name || 'User');
        }
    } catch (dbError: any) {
        console.error("Database check/creation error:", dbError);
        // Continue even if DB operation fails
    }

    const role = await getUserRole(userId);
    await setRoleCookie(role as UserRole);

    return {
      success: true,
      message: "OAuth process completed successfully",
      data: {
        userId: userId,
        role: role as UserRole
      }
    };
  } catch (error: any) {
    console.error("OAuth Callback Error:", error);
    throw new Error(error?.message || "Failed to complete auth process");
  }
};

/**
 * Check if user is logged in
 */
export const isLoggedIn = async () => {
  try {
    const { accounts } = await createClientSession();
    const user = await accounts.get();

    return !!(user && user.$id);
  } catch (error) {
    return false;
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async () => {
  try {
    const { accounts } = await createClientSession();
    const user = await accounts.get();

    if (!user) {
      return {
        success: false,
        message: "No authenticated user found",
        user: null
      };
    }

    return {
      success: true,
      message: "User retrieved successfully",
      user
    };
  } catch (error: any) {
    // console.error("Get Current User Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to get active user",
      user: null
    };
  }
};

/**
 * List all active sessions for the current user
 */
export const listActiveSessions = async () => {
  try {
    const { accounts } = await createClientSession();
    const sessions = await accounts.listSessions();

    return {
      success: true,
      sessions: sessions.sessions,
      total: sessions.total
    };
  } catch (error: any) {
    console.error("List Sessions Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to list sessions",
      sessions: [],
      total: 0
    };
  }
};

/**
 * Delete a specific session by ID
 */
export const deleteSessionById = async (sessionId: string) => {
  try {
    const { accounts } = await createClientSession();

    await accounts.deleteSession({
      sessionId
    });

    // If deleting current session, clear cookies
    if (sessionId === 'current') {
      await deleteSessionCookie();
      await deleteRoleCookie();
    }

    return {
      success: true,
      message: "Session deleted successfully"
    };
  } catch (error: any) {
    console.error("Delete Session Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to delete session"
    };
  }
};

/**
 * Get OAuth identities linked to the user account
 */
export const getLinkedIdentities = async () => {
  try {
    const { accounts } = await createClientSession();
    const identities = await accounts.listIdentities();

    return {
      success: true,
      identities: identities.identities,
      total: identities.total
    };
  } catch (error: any) {
    console.error("Get Linked Identities Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to get linked identities",
      identities: [],
      total: 0
    };
  }
};

/**
 * Delete an OAuth identity (unlink provider)
 */
export const unlinkIdentity = async (identityId: string) => {
  try {
    const { accounts } = await createClientSession();

    await accounts.deleteIdentity({
      identityId
    });

    return {
      success: true,
      message: "Identity unlinked successfully"
    };
  } catch (error: any) {
    console.error("Unlink Identity Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to unlink identity"
    };
  }
};
