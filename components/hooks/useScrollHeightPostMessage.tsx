import { useEffect } from "react";

/**
 * Sends the current scroll height via the {@link window.postMessage} api
 * to the parent frame.
 */
export function useScrollHeightPostMessage(): void {
  useEffect(() => {
    const topWindow = window.top;
    topWindow?.postMessage(
      {
        scrollHeight: document.body.scrollHeight,
      },
      "*"
    );
  }, []);
}
