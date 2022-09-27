import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { jobhistory_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getJobhistory(jobId) {
  const { data } = await axios.get(`${jobhistory_url}?fv=${jobId}`);
  //const { data } = await axios.get(`${leaves_url}`);
  return data;
}

export function useJobhistory(empid) {
  const [filter, setFilter] = useState("all");
  const [jobId, setJobId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: jobhistory = fallback } = useQuery(
    [queryKeys.jobhistory, jobId],
    //queryKeys.leaves,
    () => getJobhistory(jobId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { jobhistory, filter, setFilter, setJobId };
}
