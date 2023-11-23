import useSWR from "swr";
import { browseUserGroupTopicStance, readUserGroup } from "./fetchers";

export default function useUserGroupTopicStance(
  userGroupId: number,
  query?: {
    record_date?: string; 
  }
  ) {
  const userGroupTopicStanceSWR = useSWR(
    ["userGroupTopicStance", userGroupId, JSON.stringify(query)],
    () => browseUserGroupTopicStance({ group_id: userGroupId, ...query })
  );

  return userGroupTopicStanceSWR;
}
