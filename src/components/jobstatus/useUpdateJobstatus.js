import { useMutation, useQueryClient } from "react-query";
import { jobstatus_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateJobstatus(data) {
  const { id, ...fields } = data;

  await fetch(jobstatus_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateJobstatus(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateJobstatus(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("jobstatus");
      // toast({
      //   title: "Leave record being updated!",
      //   status: "success",
      // });
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
