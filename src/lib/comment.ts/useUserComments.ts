import useSWR from "swr";
import { browseUserComments } from "./fetchers";

export default function useUserComments(
  userId: string,
  query?: {
    limit?: number;
    offset?: number;
  }
) {
  const userCommentsSWR = useSWR(["userComments", userId], () =>
    browseUserComments({ user_id: userId, ...query })
  );

  return userCommentsSWR;
}
