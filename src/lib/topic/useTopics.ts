import useSWR from "swr";
import { browseTopics } from "./fetchers";

export default function useTopics(
  query?: {
    record_date?: string; 
  }
) {
  const topicsSWR = useSWR(
    ["topics", JSON.stringify(query)], 
    () => browseTopics({ ...query }));

  return topicsSWR;
}
