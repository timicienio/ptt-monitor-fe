import api from "../api";

export const readUserGroup = api
  .path("/user-group/{group_id}")
  .method("get")
  .create();

export const browseUserGroupActiveUsers = api
  .path("/user-group/{group_id}/active-user")
  .method("get")
  .create();

export const browseUserGroupTopicStance = api
  .path("/user-group/{group_id}/stance")
  .method("get")
  .create();

export const browseUserGroupActiveTopics = api
  .path("/user-group/{group_id}/active-topic")
  .method("get")
  .create();
