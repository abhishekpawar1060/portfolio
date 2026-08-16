import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectIndex from "@/components/sections/ProjectIndex";
import Backdrop from "@/components/visuals/Backdrop";

export const metadata: Metadata = {
  title: "Projects",
  description: "Full index of case studies — retrieval, agents, ML systems and platform work.",
};

export default function ProjectsPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <Backdrop variant="subtle" />
        <Container size="wide">
          <SectionHeading
            index="—"
            kicker="Index"
            title="Everything, in order."
            description="The full archive. Expand a row for the summary, or open the case study for the architecture and the numbers."
          />
        </Container>
      </section>

      <Container size="wide" className="pb-24">
        <ProjectIndex />
      </Container>
    </div>
  );
}
