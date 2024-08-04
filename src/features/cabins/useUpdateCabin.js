import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { saveACarbin } from "../../services/cabin";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ cabinObj, id }) => saveACarbin(cabinObj, id),
    onSuccess: () => {
      toast.success("carbin update succeful...");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateCabin, isUpdating };
}
