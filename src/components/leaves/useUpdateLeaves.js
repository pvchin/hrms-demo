import { useMutation, useQueryClient } from "react-query";
import { leaves_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateLeaves(data) {
  const { id, ...fields } = data;

  await fetch(leaves_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateLeaves(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateLeaves(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("leaves");
      queryClient.invalidateQueries("leavesperiod");
      queryClient.invalidateQueries("leavesstatus");
      queryClient.invalidateQueries("leavesperiodbymth");
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
