import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
const reasons = [
  [
    "Experience you can build on",
    "Practical knowledge across construction, procurement and property, brought together under one roof.",
  ],
  [
    "Clarity at every step",
    "Clear scopes, realistic schedules and open conversations about costs. You know where your project stands.",
  ],
  [
    "Quality in the details",
    "Careful material selection, trusted supplier relationships and attention to how every element comes together.",
  ],
  [
    "A partnership that lasts",
    "A team that listens, keeps you involved and remains accountable from planning through handover.",
  ],
];
export default function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="section-pad why-section">
      <div className="site-shell why-grid">
        <div className="why-visual">
          <div className="why-image">
            <Image
              src="/assets/projects/completed-bungalow/entrance.webp"
              alt="Finished bungalow entrance with stone cladding, tiled steps and a covered porch"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="why-image-note">
            <span>OUR STANDARD</span>
            <p>
              Care in the process.
              <br />
              Confidence in the result.
            </p>
          </div>
        </div>
        <div className="why-content">
          <p className="eyebrow">03 / THE BOTUNS APPROACH</p>
          <h2>
            Good buildings start
            <br />
            with good relationships.
          </h2>
          <div className="reasons">
            {reasons.map(([title, text], i) => (
              <div className="reason" key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="#contact" className="text-link">
            Meet your next building partner <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
