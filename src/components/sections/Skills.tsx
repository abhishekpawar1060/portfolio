import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-background">
      <Container>

        <SectionTitle
          title="Skills"
          subtitle="Technologies I work with"
        />

        <div className="space-y-10">

          {Object.entries(skills).map(
            ([category, items]) => (
              <div key={category}>

                <h3
                  className="
                  mb-4
                  text-xl
                  font-bold
                  capitalize
                  "
                >
                  {category}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border-border bg-card px-4 py-2 text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            )
          )}

        </div>

      </Container>
    </section>
  );
}