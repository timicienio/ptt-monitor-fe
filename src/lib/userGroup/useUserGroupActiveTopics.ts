import useSWR from "swr";
import { browseUserGroupActiveTopics } from "./fetchers";

export default function useUserGroupActiveTopics(
  userGroupId: number,
  query?: {
    record_date?: string; 
  }
  ) {
  const userGroupActiveTopicsSWR = useSWR(
    ["userGroupActiveTopics", userGroupId, JSON.stringify(query)],
    () => browseUserGroupActiveTopics({ group_id: userGroupId, ...query })
  );

  return userGroupActiveTopicsSWR;
}
