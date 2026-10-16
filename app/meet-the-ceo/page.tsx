import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FooterSection from "@/components/sections/footer-section";
import Breadcrumbs from "@/components/breadcrumbs";
import JsonLd from "@/components/seo/json-ld";
import { ceo, openGraphDefaults } from "@/lib/site";
import { ceoProfileSchema } from "@/lib/structured-data";

const title = `${ceo.name}, Founder & CEO`;
const description = `Meet ${ceo.name}, founder of Botuns Construct: First Class graduate, former sand and stone supplier and builder of 60+ houses over 20 years.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/meet-the-ceo" },
  openGraph: {
    ...openGraphDefaults,
    type: "profile",
    url: "/meet-the-ceo",
    title: `${title} | Botuns Construct`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Botuns Construct`,
    description,
  },
};

const chapters = [
  {
    label: "THE FOUNDATION",
    title: "A First Class start",
    text: "He graduated with First Class Honours, the highest classification awarded, in Business Administration (B.Sc.) from the University of Ado-Ekiti, now Ekiti State University. The degree gave him what many builders learn too late: a firm grasp of budgets, planning, negotiation and people. He has applied it on every project since.",
  },
  {
    label: "THE QUARRY YEARS",
    title: "Learning materials at the source",
    text: "His career in building began in the quarry, supplying sand and stone. There he learned how aggregates are graded, how quality changes from one source to the next, and what it takes to move heavy loads reliably and on time. Few builders know their materials this well before the first block is laid.",
  },
  {
    label: "THE BUILDER",
    title: "From supplying sites to running them",
    text: "Knowing the materials led naturally to building with them. He moved into managing building construction, coordinating crews, schedules and budgets and taking projects from bare land to handover. Over more than 20 years he has delivered over 60 houses and spaces, each one adding to a reputation built on finishing what he starts.",
  },
  {
    label: "BOTUNS CONSTRUCT",
    title: "Bringing it all under one roof",
    text: "In 2025 he founded Botuns Construct Nigeria Limited to bring that experience together in one company. Every service line traces back to his career: construction and repairs from his years on site, purchasing and supply from the quarry, and property and merchandising from his training in business.",
  },
];

const strengths = [
  [
    "Materials knowledge from the source",
    "He knows what good sand, stone and block look like and where to find them, so quality is protected long before anything reaches site.",
  ],
  [
    "Business discipline on every site",
    "Clear budgets, realistic schedules and honest reporting, grounded in his training in business administration.",
  ],
  [
    "Two decades of delivery",
    "More than 60 completed houses and spaces mean fewer surprises. He has seen most problems before and knows how to prevent them.",
  ],
];

export default function MeetTheCeoPage() {
  return (
    <>
      <JsonLd data={ceoProfileSchema(description)} />
      <main id="main-content">
        <section className="ceo-hero">
          <div className="site-shell">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Meet the CEO", path: "/meet-the-ceo" },
              ]}
            />
          </div>
          <div className="site-shell ceo-hero-grid">
            <div className="ceo-hero-copy">
              <p className="eyebrow ceo-eyebrow">
                <span className="accent-dash" /> LEADERSHIP / FOUNDER’S STORY
              </p>
              <h1>
                From the quarry floor
                <br />
                <span>to the finished home.</span>
              </h1>
              <div className="ceo-byline">
                <strong>{ceo.name}</strong>
                <span>Founder &amp; Chief Executive Officer</span>
              </div>
              <p className="ceo-intro">
                For more than two decades, he has worked on every side of the
                building process: the numbers behind it, the materials that go
                into it and the sites where it all comes together. More than 60
                houses and spaces later, that experience is the foundation
                Botuns Construct is built on.
              </p>
              <a href="#journey" className="text-link">
                Read his story <ArrowUpRight size={18} />
              </a>
            </div>
            <figure className="ceo-portrait">
              <div className="ceo-portrait-frame">
                <Image
                  src="/assets/team/ceo-portrait.webp"
                  alt={`${ceo.name}, Founder and CEO of Botuns Construct, in a high-visibility vest holding a white hard hat`}
                  fill
                  priority
                  sizes="(max-width: 899px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <figcaption>
                <span>FOUNDER &amp; CEO</span>
                Botuns Construct Nigeria Limited
              </figcaption>
            </figure>
          </div>
          <div className="site-shell">
            <div className="stats-grid ceo-stats">
              <div>
                <strong>
                  1<span>st</span>
                </strong>
                <p>
                  First Class Honours, B.Sc.
                  <br />
                  Business Administration
                </p>
              </div>
              <div>
                <strong>
                  20<span>+</span>
                </strong>
                <p>
                  Years across quarrying,
                  <br />
                  supply and construction
                </p>
              </div>
              <div>
                <strong>
                  60<span>+</span>
                </strong>
                <p>
                  Houses and spaces
                  <br />
                  delivered
                </p>
              </div>
              <div>
                <strong>2025</strong>
                <p>
                  Founded Botuns Construct
                  <br />
                  Nigeria Limited
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="ceo-statement">
          <div className="site-shell">
            <p className="ceo-statement-text">
              Most builders meet their materials at the site gate.{" "}
              <span>He met them at the source.</span>
            </p>
            <div className="ceo-statement-images">
              <figure>
                <Image
                  src="/assets/services/supply.webp"
                  alt="Close-up of graded crushed stone"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption>WHERE IT STARTED · STONE &amp; SAND</figcaption>
              </figure>
              <figure>
                <Image
                  src="/assets/projects/completed-bungalow/exterior.webp"
                  alt="Completed bungalow with stone-clad columns and a paved courtyard"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                  className="object-cover"
                />
                <figcaption>WHERE IT LEADS · THE FINISHED HOME</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="journey" className="section-pad ceo-journey">
          <div className="site-shell ceo-journey-grid">
            <div className="ceo-journey-heading">
              <p className="eyebrow">THE JOURNEY</p>
              <h2>
                Two decades,
                <br />
                built from the
                <br />
                ground up.
              </h2>
            </div>
            <ol className="ceo-chapters">
              {chapters.map((chapter, i) => (
                <li key={chapter.title} className="ceo-chapter">
                  <span className="ceo-chapter-number">0{i + 1}</span>
                  <div>
                    <p className="ceo-chapter-label">{chapter.label}</p>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-pad ceo-strengths">
          <div className="site-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">WHAT HE BRINGS TO YOUR PROJECT</p>
                <h2>
                  Experience you can
                  <br />
                  build on.
                </h2>
              </div>
              <p className="section-intro">
                The lessons of the quarry, the classroom and the site, working
                together on your project.
              </p>
            </div>
            <div className="ceo-strengths-grid">
              {strengths.map(([title, text], i) => (
                <div key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ceo-cta">
          <div className="site-shell cta-inner">
            <div>
              <p className="eyebrow">BUILD WITH BOTUNS</p>
              <h2>
                Put two decades of
                <br />
                experience to work.
              </h2>
            </div>
            <div className="cta-action">
              <Link href="/#contact-form" className="button button-dark">
                Tell us about your project <ArrowUpRight size={20} />
              </Link>
              <a href="tel:+2348034706314">Or call +234 803 470 6314</a>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
