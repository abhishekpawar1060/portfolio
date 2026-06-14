import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-background">
      <Container>

        <SectionTitle
          title="Experience"
          subtitle="My professional journey"
        />

        <div className="space-y-10">

          <div className="border-l-4 border-border pl-6">
            <h3 className="text-xl font-bold">
              AI/ML Engineer
            </h3>

            <p className="text-muted-foreground">
              Dizzaroo Pvt Ltd
            </p>

            <p className="mt-2 text-muted-foreground">
              Built Text-to-SQL systems,
              RAG pipelines, FastAPI
              services and integrated
              LLM-based solutions.
            </p>
          </div>

          <div className="border-l-4 border-border pl-6">
            <h3 className="text-xl font-bold">
              Software Developer Intern
            </h3>

            <p className="text-muted-foreground">
              Tech Mahindra
            </p>

            <p className="mt-2 text-muted-foreground">
              Developed low-code platforms
              and Agentic AI workflows
              using CrewAI and the
              MEAN stack.
            </p>
          </div>

        </div>

      </Container>
    </section>
  );
}