import useSWR from "swr";
import { browseTrainRecord } from "./fetchers";

export default function useTrainRecord() {
  const trainRecordSWR = useSWR(
    ["trainRecord"], 
    () => browseTrainRecord({}));

  return trainRecordSWR;
}
