import api from "../api";

export const browseUserGraph = api.path("/user-graph").method("get").create();

export const readUserGraphByUserGroupId = api
  .path("/user-group/{group_id}/user-graph")
  .method("get")
  .create();

export const readUserNeighbor = api.path("/user-graph/neighbor");
