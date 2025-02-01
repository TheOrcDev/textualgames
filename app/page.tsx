import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import StartPlaying from "@/components/sections/start-playing";
import Footer from "@/components/ui/footer";

export default function Homepage() {
  return (
    <main>
      <Hero />
      <Features />
      <StartPlaying />
      <Footer />
    </main>
  );
}
