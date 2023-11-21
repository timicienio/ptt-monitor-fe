import api from "../api";

export const browseTrainRecord = api.path("/train-record").method("get").create();