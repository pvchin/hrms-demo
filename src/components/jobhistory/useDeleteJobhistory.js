import { useMutation, useQueryClient } from "react-query";
import { jobhistory_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteJobhistory(id) {
  await fetch(jobhistory_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteJobhistory(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteJobhistory(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("jobhistory");
      toast({
        title: "Job history record being deleted!",
        status: "warning",
      });
    },
    onError: () => {
      toast({
        title: "Network Error! Please check your internet connection!",
        status: "warning",
      });
    },
  });

  return mutate;
}
