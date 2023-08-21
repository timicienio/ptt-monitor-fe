import useSWR from "swr";
import { browseTopics } from "./fetchers";

export default function useTopics() {
  const topicsSWR = useSWR(["topics"], () => browseTopics({}));

  return topicsSWR;
}
