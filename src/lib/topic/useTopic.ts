import useSWR from "swr";
import { readTopic } from "./fetchers";

export default function useTopic(topicId: number) {
  const topicSWR = useSWR(["topic", topicId], () =>
    readTopic({ topic_id: topicId })
  );

  return topicSWR;
}
