import api from "../api";

export const browseUsers = api.path("/user").method("get").create();

export const browseActiveUsers = api
  .path("/active-user")
  .method("get")
  .create();

export const browseTopicUsers = api
  .path("/topic/{topic_id}/user")
  .method("get")
  .create();

export const browseUserUserGroup = api
  .path("/user/{user_id}/user-group")
  .method("get")
  .create();

export const readUser = api.path("/user/{user_id}").method("get").create();
