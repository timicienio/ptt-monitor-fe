import useSWRImmutable from "swr/immutable";
import { browseUserGraph } from "./fetchers";

export default function useUserGraph(
  query?: {
    record_date?: string; 
  }
) {
  const userGraphSWR = useSWRImmutable(
    ["userGraph", JSON.stringify(query)], 
    () => browseUserGraph({ ...query })
  );

  return userGraphSWR;
}
