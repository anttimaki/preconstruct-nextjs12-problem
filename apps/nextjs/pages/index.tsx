import { CookieReader, HookForm } from "components";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";


export default function Home(): JSX.Element {
  // These lines work with both Next.js v11 and v12.
  useForm();
  const cookie = Cookies.get("someCookie");

  return <>
    <h1>Minimal Next.js</h1>
    <CookieReader />
    <HookForm />
  </>
}
