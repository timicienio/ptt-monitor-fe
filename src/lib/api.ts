import { Fetcher, Middleware } from "openapi-typescript-fetch";

import { paths } from "../../types/schema";

const api = Fetcher.for<paths>();

api.configure({
  baseUrl: process.env.NEXT_PUBLIC_API_ROOT,
  use: [],
});

export default api;
