import useSWR from "swr";
import { readUserGroup } from "./fetchers";

export default function useUserGroup(userGroupId: number | undefined) {
  const userGroupSWR = useSWR(
    userGroupId ? ["userGroup", userGroupId] : null,
    () => readUserGroup({ group_id: userGroupId as number, record_id: 14 })
  );

  return userGroupSWR;
}
