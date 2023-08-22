import useSWR from "swr";
import { readUser } from "./fetchers";

export default function useUser(userId: string) {
  const userSWR = useSWR(["user"], () => readUser({ user_id: userId }));

  return userSWR;
}
