import useSWR from "swr";
import { browseUserGroup } from "./fetchers";

export default function useUserGroup(userId: string) {
  const useUserGroupSWR = useSWR(["userGroup", userId], () =>
    browseUserGroup({ user_id: userId })
  );

  return useUserGroupSWR;
}
