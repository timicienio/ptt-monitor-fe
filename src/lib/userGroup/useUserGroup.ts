import useSWR from "swr";
import { readUserGroup } from "./fetchers";

export default function useUserGroup(userGroupId: number) {
  const userGroupSWR = useSWR(["userGroup", userGroupId], () =>
    readUserGroup({ group_id: userGroupId })
  );

  return userGroupSWR;
}
