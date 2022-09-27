import { useMutation, useQueryClient } from "react-query";
import { expensesattachments_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addExpensesAttachment(data) {
  await fetch(expensesattachments_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddExpensesAttachment(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  console.log("here");
  const { mutate } = useMutation((data) => addExpensesAttachment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("expensesattachments");
      toast({
        title: "Expense Attachment record being added!",
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: "Expenses attchment add record error",
        status: "warning",
      });
    },
  });

  return mutate;
}
