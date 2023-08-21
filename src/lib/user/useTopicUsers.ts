import useSWRInfinite from "swr/infinite";
import { browseTopicUsers } from "./fetchers";

export type StanceOption = "POSITIVE" | "NEGATIVE" | "ALL";

export default function useTopicUsers(
  topicId: number,
  query: {
    limit: number;
    stance?: StanceOption;
  }
) {
  const topicUsersSWR = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null; // reached the end

      return [
        "topicUsers",
        topicId,
        pageIndex * query.limit,
        JSON.stringify(query),
      ];
    },
    async ([, , offset]) =>
      (await browseTopicUsers({ topic_id: topicId, offset, ...query })).data
        .users
  );

  return topicUsersSWR;
}
