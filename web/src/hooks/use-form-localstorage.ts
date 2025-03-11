import { useEffect } from "react";
import { FormInstance } from "antd/lib/form";
import { useLocalStorage } from "usehooks-ts";

type Props<T> = {
  form: FormInstance<T>;
  id: string; // some unique identifier that matches whatever you're editing
  enabled?: boolean;
};

export const useFormLocalStorage = <T>({
  id,
  form,
  enabled = true,
}: Props<T>) => {
  // const [state, setState] = useState<T | null>(null);
  const [state, setState, removeState] = useLocalStorage<T | null>(id, null);

  useEffect(() => {
    if (!enabled) return;

    const handleBeforeunload = () => {
      update<T>(id, form.getFieldsValue());
    };

    window.addEventListener("beforeunload", handleBeforeunload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload);
    };
  }, [id, form, enabled]);

  const update = <T>(id: string, body: T) => {
    // console.log(`updating localStorage.forms/${id}`, body);
    setState(body as any);
  };

  const clear = () => {
    // console.log(`clearing localStorage.forms/${id}`);
    removeState();
  };

  // useEffect(() => {
  //   const storage = window.localStorage.getItem(`forms/${id}`);
  //   console.log(`getting localStorage.forms/${id}`, storage);
  //   if (!storage) return;

  //   setState(JSON.parse(storage));
  // }, [id]);

  // useEffect(() => {
  //   if (state) {
  //     form.setFieldsValue(state as any);
  //   }
  // }, [form, state]);

  return { state, update, clear };
};
