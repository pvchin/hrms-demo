import { useMutation, useQueryClient } from "react-query";
import { dailyallowances_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateDailyAllows(data) {
  const { id, ...fields } = data;

  await fetch(dailyallowances_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateDailyAllows(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateDailyAllows(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("dailyallows");
      queryClient.invalidateQueries("dailyallowspayrun");
      queryClient.invalidateQueries("dailyallowsperiod");
      queryClient.invalidateQueries("dailyallowsstatus");
      toast({
        title: "Site Allowance record being updated!",
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
