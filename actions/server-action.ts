"use server";
import { actionClient } from "./safe-action";
import { RegisterformSchema, LoginformSchema } from "../lib/form-schema";

export const RegisterserverAction = actionClient
  .inputSchema(RegisterformSchema)
  .action(async ({ parsedInput }) => {
    // do something with the data
    console.log(parsedInput);
    return {
      success: true,
      message: "Form submitted successfully",
    };
  });


export const LoginserverAction = actionClient
  .inputSchema(LoginformSchema)
  .action(async ({ parsedInput }) => {
    // do something with the data
    console.log(parsedInput);
    return {
      success: true,
      message: "Form submitted successfully",
    };
  });
