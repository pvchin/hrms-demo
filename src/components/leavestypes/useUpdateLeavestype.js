import { useMutation, useQueryClient } from "react-query";
import { leavestypes_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateLeavestype(data) {
  const { id, ...fields } = data;

  await fetch(leavestypes_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateLeavestype(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateLeavestype(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("leavestypes");
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
