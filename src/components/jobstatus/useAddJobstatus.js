import { useMutation, useQueryClient } from "react-query";
import { jobstatus_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addJobstatus(data) {
  await fetch(jobstatus_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddJobstatus(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addJobstatus(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("jobstatus");
      toast({
        title: "Job status record being added!",
        status: "success",
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
