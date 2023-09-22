import useSWR from "swr";
import { browseUserPosts } from "./fetchers";

export default function useUserPosts(userId: string) {
  const userPostsSWR = useSWR(["userPosts", userId], () =>
    browseUserPosts({ user_id: userId, limit: 100 })
  );

  return userPostsSWR;
}
