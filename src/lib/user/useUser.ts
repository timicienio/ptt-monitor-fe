import useSWR from "swr";
import { readUser } from "./fetchers";

export default function useUser(userId: number) {
  const userSWR = useSWR(["user"], () => readUser({ user_id: String(userId) }));

  return userSWR;
}
