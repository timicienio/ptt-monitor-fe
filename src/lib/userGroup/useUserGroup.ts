import useSWR from "swr";
import { readUserGroup } from "./fetchers";

export default function useUserGroup(userGroupId: number | undefined) {
  const userGroupSWR = useSWR(
    userGroupId ? ["userGroup", userGroupId] : null,
    () => readUserGroup({ group_id: userGroupId as number })
  );

  return userGroupSWR;
}
