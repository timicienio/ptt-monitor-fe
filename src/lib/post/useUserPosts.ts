import useSWR from "swr";
import { browseUserPosts } from "./fetchers";

export default function useUserPosts(
  userId: string,
  query: {
    limit?: number;
    offset?: number;
  } = { limit: 12 }
) {
  const userPostsSWR = useSWR(["userPosts", userId], () =>
    browseUserPosts({ user_id: userId, ...query })
  );

  return userPostsSWR;
}
