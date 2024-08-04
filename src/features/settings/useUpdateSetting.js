import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdatingSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["settings"]);
      toast.success("setting updated successful");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdatingSetting, updateSetting };
}
