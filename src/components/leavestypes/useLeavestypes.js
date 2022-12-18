import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { leavestypes_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getLeavestypes(leaveId) {
  const { data } = await axios.get(`${leavestypes_url}?fv=${leaveId}`);
  return data;
}

export function useLeavestypes(empid) {
  const [filter, setFilter] = useState("all");
  const [leaveId, setLeaveId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: leavestypes = fallback } = useQuery(
    [queryKeys.leavestypes, leaveId],
    () => getLeavestypes(leaveId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { leavestypes, filter, setFilter, setLeaveId };
}
