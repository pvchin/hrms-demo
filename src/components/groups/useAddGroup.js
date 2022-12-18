import { useMutation, useQueryClient } from "react-query";
import { groups_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addGroup(data) {
  await fetch(groups_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddGroup(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addGroup(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
      toast({
        title: "Group record being added!",
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
