import { useMutation, useQueryClient } from "react-query";
import { leavestypes_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteLeavestype(id) {
  await fetch(leavestypes_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteLeavestype(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteLeavestype(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("leavestypes");
      toast({
        title: "Leave Type record being deleted!",
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
