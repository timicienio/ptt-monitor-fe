import useSWRImmutable from "swr/immutable";
import { browseUserGraph } from "./fetchers";

export default function useUserGraph() {
  const userGraphSWR = useSWRImmutable(["userGraph"], () =>
    browseUserGraph({ record_id: 10 })
  );

  return userGraphSWR;
}