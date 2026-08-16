import { Mail } from "lucide-react";

import { site } from "@/data/site";
import { GitHubIcon, LinkedInIcon, XIcon, ScholarIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/* TODO: remove any entry you don't want shown — the URLs live in data/site.ts */
const links = [
  { label: "GitHub", href: site.socials.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
  { label: "X", href: site.socials.x, Icon: XIcon },
  { label: "Google Scholar", href: site.socials.scholar, Icon: ScholarIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export default function SocialLinks({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer noopener"
            aria-label={label}
            className="group grid size-10 place-items-center rounded-lg border border-border/60 bg-card/40 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/40 hover:text-ember"
          >
            <Icon className={cn("size-[18px] transition-transform duration-300 group-hover:scale-110", iconClassName)} />
          </a>
        </li>
      ))}
    </ul>
  );
}
