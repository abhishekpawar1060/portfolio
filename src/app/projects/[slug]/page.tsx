import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({
  params,
}: Props) {
  const { slug } = await params;

  const project = projects.find(
    (p) => p.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-5xl font-bold">
        {project.title}
      </h1>

      <p className="mt-6 text-xl text-muted-foreground">
        {project.description}
      </p>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">
          Overview
        </h2>

        <p className="mt-4">
          {project.overview}
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">
          Problem
        </h2>

        <p className="mt-4">
          {project.problem}
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">
          Solution
        </h2>

        <p className="mt-4">
          {project.solution}
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold">
          Architecture
        </h2>

        <ul className="mt-4 list-disc pl-6">
          {project.architecture.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}