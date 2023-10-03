import useSWR from "swr";
import { browseUserGroupActiveTopics } from "./fetchers";

export default function useUserGroupActiveTopics(userGroupId: number) {
  const userGroupActiveTopicsSWR = useSWR(
    ["userGroupActiveTopics", userGroupId],
    () => browseUserGroupActiveTopics({ group_id: userGroupId })
  );

  return userGroupActiveTopicsSWR;
}
