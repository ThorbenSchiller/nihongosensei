import React, { FormEvent, HTMLProps, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

type SearchProps = Pick<HTMLProps<HTMLFormElement>, "className" | "style">;

export function Search(props: SearchProps): JSX.Element {
  const router = useRouter();
  const defaultValue = router.query.q ?? "";
  const [value, setValue] = useState(defaultValue ?? "");
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: "/search",
      query: {
        q: value,
      },
    });
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <form action="/search" method="get" onSubmit={submitHandler} {...props}>
      <input
        type="text"
        value={value}
        placeholder="Einträge suchen..."
        onChange={(e) => setValue(e.currentTarget.value)}
        className="w-full p-3 bg-transparent text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded outline-none focus:border-gray-500"
      />
    </form>
  );
}
