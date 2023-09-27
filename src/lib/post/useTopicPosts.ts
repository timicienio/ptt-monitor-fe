import useSWR from "swr";
import { browseTopicPosts } from "./fetchers";

export type TopicPostsSortOption = "HYBRID" | "RELATIVE" | "POPULAR" | "TIME";

export default function useTopicPosts(
  topicId: number,
  query: {
    limit?: number;
    offset?: number;
    sort?: TopicPostsSortOption;
  } = { limit: 12 }
) {
  const topicPostsSWR = useSWR(
    ["topicPosts", topicId, JSON.stringify(query)],
    () => browseTopicPosts({ topic_id: topicId, ...query })
  );

  return topicPostsSWR;
}
