import { useMutation, useQueryClient } from "react-query";
import { jobstatus_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteJobstatus(id) {
  await fetch(jobstatus_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteJobstatus(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteJobstatus(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("jobstatus");
      toast({
        title: "Job status record being deleted!",
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
