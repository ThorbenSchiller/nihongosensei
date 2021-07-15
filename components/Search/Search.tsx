import React, { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

export function Search(): JSX.Element {
  const router = useRouter();
  const defuaultValue = router.query.search ?? "";
  const [value, setValue] = useState(defuaultValue ?? "");
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      pathname: "/search",
      query: {
        q: value,
      },
    });
  };

  return (
    <form
      action="/search"
      method="get"
      onSubmit={submitHandler}
      className="my-3"
    >
      <input
        type="text"
        value={value}
        placeholder="Vokabeln Suchen..."
        onChange={(e) => setValue(e.currentTarget.value)}
        className="w-full p-3 bg-transparent text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded outline-none focus:border-gray-500"
      />
    </form>
  );
}
