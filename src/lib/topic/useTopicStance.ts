import useSWR from "swr";
import { browseTopicStance } from "./fetchers";

export default function useTopicStance(topicId: number) {
  const topicStanceSWR = useSWR(["topicStance", topicId], () =>
    browseTopicStance({ topic_id: topicId })
  );

  return topicStanceSWR;
}
