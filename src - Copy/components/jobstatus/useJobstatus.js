import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { jobstatus_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getJobstatus(jobId) {
  const { data } = await axios.get(`${jobstatus_url}?fv=${jobId}`);
  //const { data } = await axios.get(`${leaves_url}`);
  return data;
}

export function useJobstatus(empid) {
  const [filter, setFilter] = useState("all");
  const [statusjobId, setStatusJobId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: jobstatus = fallback } = useQuery(
    [queryKeys.jobstatus, statusjobId],
    //queryKeys.leaves,
    () => getJobstatus(statusjobId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { jobstatus, filter, setFilter, setStatusJobId };
}
