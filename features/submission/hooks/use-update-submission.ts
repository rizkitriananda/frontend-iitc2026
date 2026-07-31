import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubmission } from "@/features/submission/api/update-submission";

export function useUpdateSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-team"] });
    },
  });
}
