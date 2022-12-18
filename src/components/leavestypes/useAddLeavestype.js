import { useMutation, useQueryClient } from "react-query";
import { leavestypes_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addLeavestype(data) {
  await fetch(leavestypes_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddLeavestype(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addLeavestype(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("leavestypes");
      toast({
        title: "Leave Type record being added!",
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
