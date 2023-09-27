import useSWR from "swr";
import { browseUserPosts } from "./fetchers";

export default function useUserPosts(userId: string, fetchLimit = 5) { // without specifying a limit, it will fetch with a limit of 5
  const userPostsSWR = useSWR(["userPosts", userId], () =>
    browseUserPosts({ user_id: userId, limit: fetchLimit }) // specify a different limit: useUserPosts(someUserId, 50)
  );

  return userPostsSWR;
}
