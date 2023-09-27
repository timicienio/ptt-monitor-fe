import api from "../api";

export const browseTopics = api.path("/topic").method("get").create();

export const readTopic = api.path("/topic/{topic_id}").method("get").create();

export const browseTopicStance = api.path("/topic/{topic_id}/stance").method("get").create();

export const browseUserTopics = api
  .path("/user/{user_id}/topic")
  .method("get")
  .create();

export const browseUserStance = api
  .path("/user/{user_id}/topic_stance")
  .method("get")
  .create();