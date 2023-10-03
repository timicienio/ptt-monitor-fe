import useSWR from "swr";
import { readUserGraphByUserGroupId } from "./fetchers";

export default function useUserGroupUserGraph(userGroupId: number) {
  const userGroupUserGraphSWR = useSWR(["userGroupUserGraph"], () =>
    readUserGraphByUserGroupId({ group_id: userGroupId })
  );

  return userGroupUserGraphSWR;
}
