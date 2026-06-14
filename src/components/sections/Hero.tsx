import Container from "../ui/Container";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center py-24 bg-background">
      <Container>

        <div className="max-w-4xl">

          <p className="mb-4 text-lg">
            Hello, I'm
          </p>

          <h1 className="text-6xl font-bold md:text-8xl">
            Abhishek Pawar
          </h1>

          <h2 className="mt-4 text-2xl text-muted-foreground md:text-4xl">
            AI/ML Engineer & Full Stack Developer
          </h2>

          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Building AI-powered products,
            Agentic Workflows, RAG systems,
            and scalable web applications.
          </p>

          <div className="mt-10 flex gap-4">

            <button className="rounded-lg bg-primary px-6 py-3 text-primary-foreground">
              View Projects
            </button>

            <button className="rounded-lg border-border bg-background px-6 py-3">
              Download Resume
            </button>

          </div>

          <div className="mt-10 flex gap-6">

            <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.997.108-.775.42-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.125-.303-.535-1.527.115-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 013.003-.403c1.02.005 2.045.138 3.003.403 2.28-1.552 3.285-1.23 3.285-1.23.655 1.65.245 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.815 1.1.815 2.22 0 1.606-.015 2.896-.015 3.286 0 .32.21.695.825.577C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>

            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.84v2.07h.05c.54-1.02 1.86-2.07 3.83-2.07 4.1 0 4.85 2.7 4.85 6.2V24h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.96V24h-4V8.5z"/>
              </svg>
            </a>

            <a href="mailto:you@example.com" aria-label="Email" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 13.065L.002 4.5V19.5A2.5 2.5 0 002.5 22h19a2.5 2.5 0 002.498-2.5V4.5L12 13.065zM12 11L24 2.5H0L12 11z"/>
              </svg>
            </a>

          </div>

        </div>

      </Container>
    </section>
  );
}