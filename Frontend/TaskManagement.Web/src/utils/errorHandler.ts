import { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.error ?? "An error occurred.";
  }
  return "An unexpected error occured.";
}
