import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { groups_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getGroups(groupId) {
  const { data } = await axios.get(`${groups_url}?fv=${groupId}`);
  return data;
}

export function useGroups(empid) {
  const [filter, setFilter] = useState("all");
  const [groupId, setGroupId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: groups = fallback } = useQuery(
    [queryKeys.groups, groupId],
    () => getGroups(groupId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { groups, filter, setFilter, setGroupId };
}
