import useSWR from "swr";
import { browseTopicPosts } from "./fetchers";

export type TopicPostsSortOption = "HYBRID" | "RELATIVE" | "POPULAR" | "TIME";

export default function useTopicPosts(
  topicId: number,
  query: {
    limit?: number;
    offset?: number;
    sort?: TopicPostsSortOption;
  } = {} 
) {
  const { limit = 12, offset, sort } = query; // without specifying a limit, it will fetch with a limit of 12
  
  const topicPostsSWR = useSWR(
    ["topicPosts", topicId, JSON.stringify(query)],
    () => browseTopicPosts({ topic_id: topicId, limit, offset, sort }) // allows to custom limit, offset and sort
  );

  return topicPostsSWR;
}
