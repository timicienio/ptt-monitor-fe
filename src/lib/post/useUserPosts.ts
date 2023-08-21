import useSWR from "swr";
import { browseUserPosts } from "./fetchers";

export default function useUserPosts(userId: number) {
  const userPostsSWR = useSWR(["userPosts", userId], () =>
    browseUserPosts({ user_id: String(userId) })
  );

  return userPostsSWR;
}
