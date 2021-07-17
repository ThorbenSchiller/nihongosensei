import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

export function Search(): JSX.Element {
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
    <form
      action="/search"
      method="get"
      onSubmit={submitHandler}
      className="mb-3"
    >
      <input
        type="text"
        value={value}
        placeholder="Vokabeln suchen..."
        onChange={(e) => setValue(e.currentTarget.value)}
        className="w-full p-3 bg-transparent text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded outline-none focus:border-gray-500"
      />
    </form>
  );
}
