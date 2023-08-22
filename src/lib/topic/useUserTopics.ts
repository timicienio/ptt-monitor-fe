import useSWR from "swr";
import { browseUserTopics } from "./fetchers";

export default function useUserTopics(userId: string) {
  const userTopicsSWR = useSWR(["userTopics", userId], () =>
    browseUserTopics({ user_id: userId })
  );

  return userTopicsSWR;
}
