import { useMutation, useQueryClient } from "react-query";
import { jobhistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addJobhistory(data) {
  await fetch(jobhistory_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddJobhistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addJobhistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("jobhistory");
      toast({
        title: "Job history record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
