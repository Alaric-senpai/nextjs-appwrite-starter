import { expect, test, vi, describe, beforeEach } from "vitest";
import { refreshCurrentSession } from "./session-manager";
import { extendSession } from "@/actions/auth.actions";

// Mock the dependencies using Vitest's vi.mock
vi.mock("@/actions/auth.actions", () => ({
  extendSession: vi.fn(),
  validateSession: vi.fn(),
  getSessionExpiry: vi.fn(),
}));

vi.mock("@/server/cookies", () => ({
  deleteSessionCookie: vi.fn(),
  deleteRoleCookie: vi.fn(),
}));

describe("refreshCurrentSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should call extendSession and return successful result", async () => {
    const mockResult = {
      success: true,
      message: "Session extended successfully",
      data: { expire: "2025-01-01T00:00:00Z" }
    };

    vi.mocked(extendSession).mockResolvedValue(mockResult);

    const result = await refreshCurrentSession();

    expect(extendSession).toHaveBeenCalled();
    expect(result).toEqual(mockResult);
  });

  test("should handle error from extendSession and return failure object", async () => {
    const errorMessage = "Network error";
    vi.mocked(extendSession).mockRejectedValue(new Error(errorMessage));

    const result = await refreshCurrentSession();

    expect(extendSession).toHaveBeenCalled();
    expect(result).toEqual({
      success: false,
      message: errorMessage
    });
  });

  test("should handle failure result from extendSession", async () => {
    const mockFailureResult = {
      success: false,
      message: "Failed to extend session"
    };

    vi.mocked(extendSession).mockResolvedValue(mockFailureResult);

    const result = await refreshCurrentSession();

    expect(extendSession).toHaveBeenCalled();
    expect(result).toEqual(mockFailureResult);
  });
});
