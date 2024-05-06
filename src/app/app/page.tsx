"use client";

import { useSearchParams } from "next/navigation";

export default function App() {
  const searchParams = useSearchParams();
  const search = searchParams.get("callbackUrl");

  // console.log(search.substring(search.indexOf("?company=") + 9));

  return <div>HomePage</div>;
}
