import useSWR from "swr";
import { readUser } from "./fetchers";

export default function useUser(userId: string) {
  const userSWR = useSWR(["user", userId], () => readUser({ user_id: userId }));

  return userSWR;
}
