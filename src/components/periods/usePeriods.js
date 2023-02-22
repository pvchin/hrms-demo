import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { periods_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getPeriods(id) {
  const { data } = await axios.get(`${periods_url}?em=${id}`);
  //const { data } = await axios.get(`${payslips_url}`);
  return data;
}

export function usePeriods(empid) {
  const [filter, setFilter] = useState("all");
  const [periodId, setPeriodId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: periods = fallback } = useQuery(
    [queryKeys.periods, periodId],
    //queryKeys.payslips,
    () => getPeriods(periodId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { periods, filter, setFilter, setPeriodId };
}
