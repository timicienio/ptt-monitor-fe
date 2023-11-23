import useSWR from "swr";
import { browseUserGroupActiveUsers } from "./fetchers";

export default function useUserGroupActiveUsers(
  userGroupId: number,
  query?: {
    record_date?: string; 
  }
  ) {
  const userGroupActiveUsersSWR = useSWR(
    ["userGroupActiveUsers", userGroupId, JSON.stringify(query)],
    () => browseUserGroupActiveUsers({ group_id: userGroupId, ...query })
  );

  return userGroupActiveUsersSWR;
}
