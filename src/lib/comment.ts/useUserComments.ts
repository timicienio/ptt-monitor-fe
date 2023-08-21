import useSWR from "swr";
import { browseUserComments } from "./fetchers";

export default function useUserComments(userId: number) {
  const userCommentsSWR = useSWR(["userComments", userId], () =>
    browseUserComments({ user_id: String(userId) })
  );

  return userCommentsSWR;
}
