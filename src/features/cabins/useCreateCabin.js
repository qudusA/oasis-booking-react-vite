import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { saveACarbin } from "../../services/cabin";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: saveACarbin,
    onSuccess: () => {
      toast.success("carbin creation succeful...");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createCabin, isCreating };
}
