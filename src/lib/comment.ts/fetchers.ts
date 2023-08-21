import api from "../api";

export const browseUserComments = api
  .path("/user/{user_id}/comment")
  .method("get")
  .create();
