import { useMutation, useQueryClient } from "react-query";
import { groups_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteGroup(id) {
  await fetch(groups_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteGroup(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteGroup(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
      toast({
        title: "Group record being deleted!",
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
