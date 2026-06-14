import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <Container>

        <SectionTitle
          title="Contact"
          subtitle="Let's work together"
        />

        <form className="max-w-2xl space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-lg border-border p-4 bg-input text-foreground"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border-border p-4 bg-input text-foreground"
          />

          <textarea
            rows={6}
            placeholder="Message"
            className="w-full rounded-lg border-border p-4 bg-input text-foreground"
          />

          <button className="rounded-lg bg-primary px-6 py-3 text-primary-foreground">
            Send Message
          </button>

        </form>

      </Container>
    </section>
  );
}