import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

interface SectionIntroProps {
  eyebrow: string;
  /** One entry per rendered line — keeps editorial line breaks in content. */
  headline: readonly string[];
  body?: readonly string[];
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
  /** Headings below the page title should stay h2. */
  as?: "h2" | "h3";
}

export default function SectionIntro({
  eyebrow,
  headline,
  body,
  align = "left",
  className,
  children,
  as: Heading = "h2"
}: SectionIntroProps) {
  return (
    <div
      className={cx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>

      <Heading className="mt-6 text-balance text-[clamp(2rem,4.4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em]">
        {headline.map((line, i) => (
          <span key={line} className="block" data-reveal>
            <span className={cx(i > 0 && "text-mist")}>{line}</span>
          </span>
        ))}
      </Heading>

      {body?.map((paragraph) => (
        <p
          key={paragraph}
          className="mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg"
          data-reveal
        >
          {paragraph}
        </p>
      ))}

      {children}
    </div>
  );
}
