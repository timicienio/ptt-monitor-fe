import useSWR from "swr";
import { browseActiveUsers } from "./fetchers";
import moment from "moment";

export type ActiveUsersBrowseType = "POST" | "COMMENT";

export default function useActiveUsers(query: {
  browseType: ActiveUsersBrowseType;
  limit?: number;
  offset?: number;
  startTime?: string;
  endTime?: string;
}) {
  const browseUserSWR = useSWR(["users", JSON.stringify(query)], () =>
    browseActiveUsers({
      limit: query.limit ?? 12,
      offset: query.offset ?? 0,
      start_time: query.startTime ?? moment().subtract(5, "year").toISOString(),
      end_time: query.endTime ?? moment().toISOString(),
      browse_type: query.browseType,
    })
  );

  return browseUserSWR;
}
