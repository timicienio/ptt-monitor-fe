import api from "../api";

export const browseTopicPosts = api
  .path("/topic/{topic_id}/post")
  .method("get")
  .create();

export const browseUserPosts = api
  .path("/user/{user_id}/post")
  .method("get")
  .create();
