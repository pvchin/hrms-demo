import { useMutation, useQueryClient } from "react-query";
import { jobhistory_url } from "../../utils/constants";
//import { useCustomToast } from "../../helpers/useCustomToast";

async function updateJobhistory(data) {
  const { id, ...fields } = data;

  await fetch(jobhistory_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateJobhistory(data) {
  const queryClient = useQueryClient();
  //const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateJobhistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("jobhistory");
      // toast({
      //   title: "Leave record being updated!",
      //   status: "success",
      // });
    },
  });

  return mutate;
}
