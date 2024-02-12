import { toast } from "vue-sonner";

/**
 * toast's the response error
 */
export const $toastFetch = $fetch.create({
  onResponseError: ({ response }) => {
    const error = response._data.message;
    toast.error(error || "There was an error while logging in");
  },
});

