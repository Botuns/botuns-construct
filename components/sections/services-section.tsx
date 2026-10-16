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
  },
  {
    title: "Purchasing & supply",
    text: "The right materials, where you need them. Reliable procurement of construction materials and equipment.",
    Icon: Package,
    tags: "MATERIALS / EQUIPMENT / PROCUREMENT",
  },
  {
    title: "Property & investment",
    text: "See the potential in every space. Property development, sales and guidance for your next investment.",
    Icon: House,
    tags: "DEVELOPMENT / SALES / ADVISORY",
  },
  {
    title: "General merchandising",
    text: "Practical sourcing and trading solutions that help your business get what it needs to move forward.",
    Icon: ShoppingBag,
    tags: "SOURCING / TRADING / BUSINESS SUPPLIES",
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
          {services.map(({ title, text, Icon, tags }, i) => (
            <a key={title} className="service-card" href="#contact-form">
              <div className="service-top">
                <Icon size={29} strokeWidth={1.3} />
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
