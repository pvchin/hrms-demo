import { useMutation, useQueryClient } from "react-query";
import { expensesattachments_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteExpensesAttachment(id) {
  await fetch(expensesattachments_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteExpensesAttachment(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteExpensesAttachment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("expensesattachments");
    //   toast({
    //     title: "Expense attachment record being deleted!",
    //     status: "warning",
    //   });
    },
  });

  return mutate;
}
