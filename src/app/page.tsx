import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { HqCam } from "@/components/hq-cam";
import { Flow } from "@/components/flow";
import { AutoDm } from "@/components/auto-dm";
import { Academy } from "@/components/academy";
import { Backers, Proof } from "@/components/proof";
import { Reserve } from "@/components/reserve";
import { Investors } from "@/components/investors";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Flow />
        <AutoDm />
        <Academy />
        <Proof />
        <Backers />
        <HqCam />
        <Reserve />
        <Investors />
      </main>
      <Footer />
    </>
  );
}
