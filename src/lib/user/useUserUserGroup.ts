import useSWR from "swr";
import { browseUserUserGroup } from "./fetchers";

export default function useUserUserGroup(userId: string) {
  const useUserGroupSWR = useSWR(["userGroup", userId], () =>
    browseUserUserGroup({ user_id: userId })
  );

  return useUserGroupSWR;
}
