import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { expensesattachments_url } from "../../utils/constants";
import { filterById } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getExpenses(id) {
  const { data } = await axios.get(`${expensesattachments_url}?fi=${id}`);
  //const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useExpensesAttachments(empid) {
  const [filter, setFilter] = useState("all");
  const [attachmentId, setAttachmentId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterById(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: expensesattachments = fallback } = useQuery(
    [queryKeys.expensesattachments,  attachmentId ],
    //queryKeys.expenses,
    () => getExpenses(attachmentId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { expensesattachments, filter, setFilter, setAttachmentId };
}
