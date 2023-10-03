import useSWR from "swr";
import { browseUserGroupActiveUsers } from "./fetchers";

export default function useUserGroupActiveUsers(userGroupId: number) {
  const userGroupActiveUsersSWR = useSWR(
    ["userGroupActiveUsers", userGroupId],
    () => browseUserGroupActiveUsers({ group_id: userGroupId })
  );

  return userGroupActiveUsersSWR;
}