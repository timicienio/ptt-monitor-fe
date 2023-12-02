import useSWR from "swr";
import { browseUserTopics } from "./fetchers";

export default function useUserTopics(
    userId: string,
    query?: {
      record_date?: string; 
    }
  ) {
  const userTopicsSWR = useSWR(["userTopics", userId, JSON.stringify(query)], () =>
    browseUserTopics({ user_id: userId, ...query })
  );

  return userTopicsSWR;
}
