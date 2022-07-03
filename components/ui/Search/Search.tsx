import { useRouter } from "next/router";
import { FormEvent, HTMLProps, useCallback, useEffect, useState } from "react";

type SearchProps = Pick<HTMLProps<HTMLFormElement>, "className" | "style"> &
  Pick<HTMLProps<HTMLInputElement>, "autoFocus">;

export function Search({ autoFocus, ...formProps }: SearchProps): JSX.Element {
  const router = useRouter();
  const defaultValue = router.query.q ?? "";
  const [value, setValue] = useState(defaultValue ?? "");
  const submitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      router.push({
        pathname: "/search",
        query: {
          q: value,
        },
      });
    },
    [router, value]
  );
  const handleChange: NonNullable<HTMLProps<HTMLInputElement>["onChange"]> =
    useCallback((e) => setValue(e.currentTarget.value), []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <form action="/search" method="get" onSubmit={submitHandler} {...formProps}>
      <input
        type="text"
        value={value}
        placeholder="Einträge suchen..."
        onChange={handleChange}
        className="w-full px-3 py-2 bg-transparent text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded outline-none focus:border-gray-500"
        autoFocus={autoFocus}
      />
    </form>
  );
}
