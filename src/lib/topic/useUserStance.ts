import useSWR from "swr";
import { browseUserStance } from "./fetchers";

export default function useUserStance(userId: string) {
  const userStanceSWR = useSWR(["userStance", userId], () =>
    browseUserStance({ user_id: userId })
  );

  return userStanceSWR;
}
