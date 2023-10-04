import useSWR from "swr";
import { readUserGraphByUserGroupId } from "./fetchers";

export default function useUserGroupUserGraph(userGroupId: number) {
  const userGroupUserGraphSWR = useSWR(["userGroupUserGraph"], () =>
    readUserGraphByUserGroupId({ group_id: userGroupId, record_id: 14 })
  );

  return userGroupUserGraphSWR;
}
