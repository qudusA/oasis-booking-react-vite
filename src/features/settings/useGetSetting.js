import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useGetSetting() {
  const {
    data: settingData,
    error,
    isLoading: isLoadingSetting,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return { settingData, isLoadingSetting, error };
}
