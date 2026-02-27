import { describe, it, expect, vi } from "vitest";
import { OAuthServerAction } from "@/actions/auth.actions";

// Mock dependencies
vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue("https://example.com"),
  }),
}));

vi.mock("@/config/appwrite.config", () => ({
  appwritecfg: {
    project: {
      endpoint: "https://cloud.appwrite.io/v1",
      id: "test-project-id",
    },
  },
}));

vi.mock("@/actions/safe-action", () => ({
  actionClient: {
    inputSchema: () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: (fn: any) => fn,
    }),
  },
}));

// Mock other dependencies to prevent import errors or side effects
vi.mock("@/server/clients", () => ({
  createAdminSession: vi.fn(),
  createClientSession: vi.fn(),
}));

vi.mock("@/server/cookies", () => ({
  setSessionCookie: vi.fn(),
  setRoleCookie: vi.fn(),
  deleteSessionCookie: vi.fn(),
  deleteRoleCookie: vi.fn(),
  getUserSessionCookie: vi.fn(),
}));

vi.mock("@/actions/user.actions", () => ({
  createUserRecord: vi.fn(),
  getUserRole: vi.fn(),
}));

describe("OAuthServerAction", () => {
  it("should generate correct redirect URL for Google provider", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (OAuthServerAction as any)({
      parsedInput: { provider: "google" },
    });

    expect(result.success).toBe(true);
    const url = new URL(result.data.redirectUrl);

    expect(url.origin).toBe("https://cloud.appwrite.io");
    expect(url.pathname).toBe("/v1/account/sessions/oauth2/google");
    expect(url.searchParams.get("project")).toBe("test-project-id");
    expect(url.searchParams.get("success")).toBe("https://example.com/oauth");
    expect(url.searchParams.get("failure")).toBe("https://example.com/fail?error=oauth_failed");
  });

  it("should generate correct redirect URL for Github provider", async () => {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const result = await (OAuthServerAction as any)({
      parsedInput: { provider: "github" },
    });

    expect(result.success).toBe(true);
    const url = new URL(result.data.redirectUrl);

    expect(url.pathname).toBe("/v1/account/sessions/oauth2/github");
    expect(url.searchParams.get("project")).toBe("test-project-id");
    expect(url.searchParams.get("success")).toBe("https://example.com/oauth");
    expect(url.searchParams.get("failure")).toBe("https://example.com/fail?error=oauth_failed");
  });

  it("should generate correct redirect URL for Apple provider", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (OAuthServerAction as any)({
      parsedInput: { provider: "apple" },
    });

    expect(result.success).toBe(true);
    const url = new URL(result.data.redirectUrl);

    expect(url.pathname).toBe("/v1/account/sessions/oauth2/apple");
  });

  it("should generate correct redirect URL for Microsoft provider", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (OAuthServerAction as any)({
      parsedInput: { provider: "microsoft" },
    });

    expect(result.success).toBe(true);
    const url = new URL(result.data.redirectUrl);

    expect(url.pathname).toBe("/v1/account/sessions/oauth2/microsoft");
  });

  it("should generate correct redirect URL for Facebook provider", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (OAuthServerAction as any)({
      parsedInput: { provider: "facebook" },
    });

    expect(result.success).toBe(true);
    const url = new URL(result.data.redirectUrl);

    expect(url.pathname).toBe("/v1/account/sessions/oauth2/facebook");
  });
});
