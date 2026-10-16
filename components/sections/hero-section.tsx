import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="site-shell hero-heading">
        <div>
          <p className="eyebrow">
            <span className="accent-dash" /> BUILT WITH PURPOSE. BUILT TO LAST.
          </p>
          <h1>
            Strong foundations.
            <br />
            <span>Greater possibilities.</span>
          </h1>
        </div>
        <div className="hero-intro">
          <p>
            From the first conversation to the final finish. Construction,
            property and supply solutions, built around you.
          </p>
          <a href="#portfolio" className="text-link">
            Explore our work <ArrowUpRight size={19} />
          </a>
        </div>
      </div>
      <div className="site-shell">
        <div className="hero-image">
          <Image
            src="/assets/projects/completed-bungalow/exterior.webp"
            alt="Recently completed bungalow with a covered entrance, stone-clad columns and paved courtyard"
            fill
            priority
            sizes="(max-width: 700px) 100vw, 92vw"
            className="object-cover"
          />
          <div className="hero-image-shade" />
          <div className="hero-image-caption">
            <span>RECENTLY COMPLETED / RESIDENTIAL</span>
            <p>
              A vision,
              <br />
              brought to life.
            </p>
          </div>
          <a href="#contact" className="hero-project-link">
            <span>
              Have a project in mind?<strong>Let’s build it together</strong>
            </span>
            <ArrowUpRight size={28} />
          </a>
          <span className="image-index">01 — COMPLETED BUNGALOW</span>
        </div>
        <div className="hero-bottom">
          <span>
            <span className="location-dot" /> IBADAN, NIGERIA · BUILDING
            NATIONWIDE
          </span>
          <a href="#about">
            GET TO KNOW BOTUNS <ArrowDown size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
