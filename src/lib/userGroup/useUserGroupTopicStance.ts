import useSWR from "swr";
import { browseUserGroupTopicStance, readUserGroup } from "./fetchers";

export default function useUserGroupTopicStance(userGroupId: number) {
  const userGroupTopicStanceSWR = useSWR(
    ["userGroupTopicStance", userGroupId],
    () => browseUserGroupTopicStance({ group_id: userGroupId })
  );

  return userGroupTopicStanceSWR;
}
