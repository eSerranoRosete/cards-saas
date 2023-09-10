import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

type Props<T> = {
  form: UseFormReturn<any, any, undefined>;
  setAlert?: (tab: T, value: boolean) => void;
  tabFields: string[];
  tab: T;
};

export function useWatchErrors<T>({
  form,
  tabFields,
  tab,
  setAlert,
}: Props<T>) {
  const errorsArray = Object.keys(form.formState.errors);

  const hasErrors = errorsArray.some((error) => tabFields.includes(error));

  useEffect(() => {
    if (hasErrors) {
      setAlert && setAlert(tab, true);
    } else {
      setAlert && setAlert(tab, false);
    }
  }, [hasErrors]);

  return hasErrors;
}
