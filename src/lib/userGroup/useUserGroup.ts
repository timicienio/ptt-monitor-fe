import useSWR from "swr";
import { readUserGroup } from "./fetchers";

export default function useUserGroup(
  userGroupId: number | undefined,
  query?: {
    record_date?: string; 
  }
  ) {
  const userGroupSWR = useSWR(
    userGroupId ? ["userGroup", userGroupId, JSON.stringify(query)] : null,
    () => readUserGroup({ group_id: userGroupId as number, ...query })
  );

  return userGroupSWR;
}
