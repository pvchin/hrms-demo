import { useMutation, useQueryClient } from "react-query";
import { periods_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updatePeriods(data) {
  const { id, ...fields } = data;

  await fetch(periods_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdatePeriods(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updatePeriods(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("periods");
      // toast({
      //   title: "Payslip record being updated!",
      //   status: "success",
      // });
    },
    onErrot: () => {
      toast({
        title: "Internet connection error! Record not updated!",
        status: "warning",
      });
    },
  });

  return mutate;
}
