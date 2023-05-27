'use client'
import { Suspense } from "react";
import Loading from "./loading";
import Homepage from "./homepage/page";

export default function Home() {

  return (

    <main className="mb-20 flex-col items-center justify-between">
      <Suspense fallback={<Loading />}>
        <Homepage />
      </Suspense>
    </main >
  )
}
