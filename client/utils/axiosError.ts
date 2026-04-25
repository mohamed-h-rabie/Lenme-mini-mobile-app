import axios from "axios";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string") return data;
    if (isRecord(data) && typeof data.message === "string") return data.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
