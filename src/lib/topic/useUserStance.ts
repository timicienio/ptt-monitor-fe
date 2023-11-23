import useSWR from "swr";
import { browseUserStance } from "./fetchers";

export default function useUserStance(
    userId: string,
    query?: {
      record_date?: string; 
    }
  ) {
  const userStanceSWR = useSWR(["userStance", userId, JSON.stringify(query)], () =>
    browseUserStance({ user_id: userId, ...query })
  );

  return userStanceSWR;
}
