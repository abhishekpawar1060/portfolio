import Container from "../ui/Container";
import { Mail } from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.42-3.88-1.42-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.06 11.06 0 012.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18 0 1.58-.01 2.86-.01 3.25 0 .31.21.68.8.56A10.52 10.52 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.1 1 2.5 1 4.98 2.12 4.98 3.5z" fill="currentColor" />
      <path d="M0 8.98h5V24H0zM8.5 8.98h4.79v2.06h.07c.67-1.27 2.31-2.61 4.75-2.61C22.42 8.43 24 11.03 24 14.91V24h-5v-8.51c0-2.03-.04-4.64-2.82-4.64-2.82 0-3.25 2.2-3.25 4.48V24h-5V8.98z" fill="currentColor" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center py-24 bg-background">
      <Container>
        <div className="max-w-4xl space-y-6">
          <p className="text-lg text-muted-foreground">
            Hello, I'm
          </p>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            Abhishek Pawar
          </h1>

          <h2 className="text-2xl font-medium text-muted-foreground md:text-4xl">
            AI/ML Engineer & Full Stack Developer
          </h2>

          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Building AI-powered applications, RAG systems,
            Agentic workflows, and scalable web platforms
            using Next.js, FastAPI, PostgreSQL, Azure,
            and Large Language Models.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="
                rounded-lg
                bg-primary
                px-6
                py-3
                text-primary-foreground
                transition-all
                hover:opacity-90
              "
            >
              View Projects
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-lg
                border
                px-6
                py-3
                transition-all
                hover:bg-muted
              "
            >
              Download Resume
            </a>
          </div>

          <div className="flex gap-6 pt-4">
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              <GitHubIcon className="h-6 w-6" />
            </a>

            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              <LinkedInIcon className="h-6 w-6" />
            </a>

            <a
              href="mailto:your-email@gmail.com"
              aria-label="Email"
              className="
                text-muted-foreground
                transition-colors
                hover:text-foreground
              "
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}