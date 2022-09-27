import { useMutation, useQueryClient } from "react-query";
import { expensesattachments_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateExpensesAttachment(data) {
  const { id, ...fields } = data;

  await fetch(expensesattachments_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateExpensesAttachment(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateExpensesAttachment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("expensesattachments");
      toast({
        title: "Expense attachments record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
