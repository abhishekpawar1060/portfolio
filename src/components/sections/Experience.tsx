import Container from "../ui/Container";
import { experiences } from "@/data//experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 bg-background"
    >
      <Container>
        <div className="mb-16">
          <h2 className="text-4xl font-bold">
            Experience
          </h2>

          <p className="mt-3 text-muted-foreground">
            My professional journey.
          </p>
        </div>

        <div className="space-y-8">

          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="
                rounded-xl
                border
                p-8
                shadow-sm
              "
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                <div>
                  <h3 className="text-2xl font-semibold">
                    {experience.role}
                  </h3>

                  <p className="text-muted-foreground">
                    {experience.company}
                  </p>
                </div>

                <span className="text-sm text-muted-foreground">
                  {experience.duration}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {experience.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3"
                  >
                    <span>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </Container>
    </section>
  );
}