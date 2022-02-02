import Cookies from "js-cookie";
import React from "react";

export const CookieReader: React.FC = () => {
  let cookie: string | undefined = "not read";

  // The next line works with Next.js v11, but breaks with v12.
  cookie = Cookies.get("someCookie");

  return <p>Cookie value is: {cookie}</p>;
};
