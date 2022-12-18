import { useMutation, useQueryClient } from "react-query";
import { groups_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateGroup(data) {
  const { id, ...fields } = data;

  await fetch(groups_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateGroup(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateGroup(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
      toast({
        title: "Group record being updated!",
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
