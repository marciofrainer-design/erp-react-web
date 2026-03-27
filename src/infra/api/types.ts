export type ApiCallOptions = {
  controller: string;
  method: string;
  params?: unknown;
  body?: unknown;
  verb?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
};