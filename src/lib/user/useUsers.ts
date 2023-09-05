import useSWR from "swr";
import { browseUsers } from "./fetchers";

export default function useUsers(query?: {
  limit?: number;
  offset?: number;
  userId?: string;
}) {
  const browseUserSWR = useSWR(["users", JSON.stringify(query)], () =>
    browseUsers({
      limit: query?.limit ?? 12,
      offset: query?.offset ?? 0,
      user_id: query?.userId ?? "",
    })
  );

  return browseUserSWR;
}
