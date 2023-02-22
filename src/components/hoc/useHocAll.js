import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { hoc_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getHocAll(hocid, yearId) {
  const { data } = await axios.get(`${hoc_url}?all=${hocid}&y=${yearId}`);
  return data;
}

export function useHocAll(empid) {
  const [filter, setFilter] = useState("all");
  const [hocallId, setHocallId] = useState("");
  const [hocallyearId, setHocallYearId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: hocall = fallback } = useQuery(
    [queryKeys.hocall, hocallId, hocallyearId],
    () => getHocAll(hocallId, hocallyearId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { hocall, filter, setFilter, setHocallId, setHocallYearId };
}
