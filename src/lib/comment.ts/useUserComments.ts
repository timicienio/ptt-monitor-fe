import useSWR from "swr";
import { browseUserComments } from "./fetchers";

export default function useUserComments(userId: string, fetchLimit = 5) { // without specifying a limit, it will fetch with a limit of 5
  const userCommentsSWR = useSWR(["userComments", userId], () =>
    browseUserComments({ user_id: userId, limit: fetchLimit })
  );

  return userCommentsSWR;
}
