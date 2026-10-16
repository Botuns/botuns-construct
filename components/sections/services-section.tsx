import Image from "next/image";
import {
  ArrowUpRight,
  Hammer,
  Package,
  House,
  ShoppingBag,
} from "lucide-react";
const services = [
  {
    title: "Construction & repairs",
    text: "From foundations to finishing touches. Complete builds, thoughtful renovations and structural repairs.",
    Icon: Hammer,
    tags: "NEW BUILDS / RENOVATIONS / REPAIRS",
    image: "/assets/services/construction.webp",
    position: "62% center",
  },
  {
    title: "Purchasing & supply",
    text: "The right materials, where you need them. Reliable procurement of construction materials and equipment.",
    Icon: Package,
    tags: "MATERIALS / EQUIPMENT / PROCUREMENT",
    image: "/assets/services/supply.webp",
    position: "center",
  },
  {
    title: "Property & investment",
    text: "See the potential in every space. Property development, sales and guidance for your next investment.",
    Icon: House,
    tags: "DEVELOPMENT / SALES / ADVISORY",
    image: "/assets/projects/completed-bungalow/side-elevation.webp",
    position: "70% center",
  },
  {
    title: "General merchandising",
    text: "Practical sourcing and trading solutions that help your business get what it needs to move forward.",
    Icon: ShoppingBag,
    tags: "SOURCING / TRADING / BUSINESS SUPPLIES",
    image: "/assets/services/merchandising.webp",
    position: "40% center",
  },
];
export default function ServicesSection() {
  return (
    <section id="services" className="section-pad services-section">
      <div className="site-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / WHAT WE DO</p>
            <h2>
              Big ambitions.
              <br />
              Considered solutions.
            </h2>
          </div>
          <p className="section-intro">
            Four connected areas of expertise.
            <br />
            One team invested in your success.
          </p>
        </div>
        <div className="services-grid">
          {services.map(({ title, text, Icon, tags, image, position }, i) => (
            <a key={title} className="service-card" href="#contact-form">
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw"
                className="service-image"
                style={{ objectPosition: position }}
              />
              <span className="service-shade" aria-hidden="true" />
              <div className="service-top">
                <span className="service-icon">
                  <Icon size={24} strokeWidth={1.4} />
                </span>
                <span>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="service-bottom">
                <span>{tags}</span>
                <ArrowUpRight size={22} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
