import { UplinkHeader } from "@/components/thegridcn/uplink-header";

import FeaturesBentoGrid from "../features/features-bento-grid";

export default function Features() {
  return (
    <section className="flex w-full flex-col gap-7 overflow-hidden px-5 py-20 antialiased md:px-12 lg:px-24">
      <UplinkHeader leftText="Capabilities" rightText="Core systems ready" />
      <div className="max-w-3xl space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-primary">
          Key features
        </p>
        <h2 className="font-display text-3xl font-bold uppercase tracking-wider md:text-4xl">
          Story systems built for repeated runs
        </h2>
      </div>
      <FeaturesBentoGrid />
    </section>
  );
}
