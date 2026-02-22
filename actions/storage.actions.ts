"use server";

import { ID } from "node-appwrite";
import { createClientSession } from "@/server/clients";
import { appwritecfg } from "@/config/appwrite.config";
import { InputFile } from "node-appwrite/file";
import { actionClient } from "./safe-action";
import * as z from "zod";

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file uploaded");

    const buffer = Buffer.from(await file.arrayBuffer());
    const inputFile = InputFile.fromBuffer(buffer, file.name);

    // Use client session to ensure user permissions are respected
    const { storage } = await createClientSession();
    const result = await storage.createFile(
      appwritecfg.bucketId,
      ID.unique(),
      inputFile
    );

    return { success: true, file: result };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { success: false, error: error.message };
  }
}

export const deleteFile = actionClient
  .inputSchema(z.object({ fileId: z.string() }))
  .action(async ({ parsedInput: { fileId } }) => {
    try {
      const { storage } = await createClientSession();
      await storage.deleteFile(appwritecfg.bucketId, fileId);
      return { success: true };
    } catch (error: any) {
      console.error("Delete error:", error);
      return { success: false, error: error.message };
    }
  });

export const getFileView = actionClient
  .inputSchema(z.object({ fileId: z.string() }))
  .action(async ({ parsedInput: { fileId } }) => {
    try {
      const { storage } = await createClientSession();
      const buffer = await storage.getFileView(appwritecfg.bucketId, fileId);

      const base64 = Buffer.from(buffer).toString('base64');
      return { success: true, base64, mimeType: 'image/png' };
    } catch (error: any) {
      console.error("Get View error:", error);
      return { success: false, error: error.message };
    }
  });

export const getFileDownload = actionClient
  .inputSchema(z.object({ fileId: z.string() }))
  .action(async ({ parsedInput: { fileId } }) => {
    try {
      const { storage } = await createClientSession();
      const buffer = await storage.getFileDownload(appwritecfg.bucketId, fileId);

      const base64 = Buffer.from(buffer).toString('base64');
      return { success: true, base64 };
    } catch (error: any) {
      console.error("Download error:", error);
      return { success: false, error: error.message };
    }
  });
