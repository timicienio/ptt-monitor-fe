import api from "../api";

export const browseTopicUsers = api
  .path("/topic/{topic_id}/user")
  .method("get")
  .create();

export const readUser = api.path("/user/{user_id}").method("get").create();
