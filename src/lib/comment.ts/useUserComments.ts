import useSWR from "swr";
import { browseUserComments } from "./fetchers";

export default function useUserComments(userId: string) {
  const userCommentsSWR = useSWR(["userComments", userId], () =>
    browseUserComments({ user_id: userId })
  );

  return userCommentsSWR;
}
