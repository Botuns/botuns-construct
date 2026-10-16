import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const explore = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/#about" },
  { name: "Our services", href: "/#services" },
  { name: "Projects", href: "/#portfolio" },
  { name: "Meet the CEO", href: "/meet-the-ceo" },
  { name: "Contact", href: "/#contact-form" },
];
const services = [
  "Construction & repairs",
  "Purchasing & supply",
  "Property & investment",
  "General merchandising",
];
export default function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="footer-lockup" aria-label="Botuns Construct home">
              <Image
                src="/brand/botuns-mark-on-dark.png"
                width={379}
                height={263}
                alt=""
                className="footer-mark"
              />
              <span>
                BOTUNS
                <span>CONSTRUCT NIGERIA LIMITED</span>
              </span>
            </Link>
            <p className="footer-tagline">
              Strong foundations.
              <br />
              Lasting relationships.
            </p>
            <Link href="/#contact-form" className="button button-light">
              Start your project <ArrowUpRight size={18} />
            </Link>
          </div>
          <nav className="footer-column" aria-label="Footer">
            <p className="footer-label">EXPLORE</p>
            {explore.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="footer-column">
            <p className="footer-label">SERVICES</p>
            {services.map((service) => (
              <Link key={service} href="/#services">
                {service}
              </Link>
            ))}
          </div>
          <div className="footer-column footer-contact">
            <p className="footer-label">GET IN TOUCH</p>
            <p>
              KM 13, Lagos-Ibadan Express Way
              <br />
              Sonel Bonel, Ibadan, Oyo State
            </p>
            <a href="tel:+2348034706314">+234 803 470 6314</a>
            <a href="tel:+2349015903818">+234 901 590 3818</a>
            <a href="mailto:botunsconstructlimited@gmail.com">
              botunsconstructlimited@gmail.com
            </a>
            <p className="footer-hours">
              Mon–Fri · 8am–6pm
              <br />
              Saturday · 9am–4pm
            </p>
          </div>
        </div>
        <svg
          className="footer-wordmark"
          viewBox="0 0 1000 190"
          aria-hidden="true"
          focusable="false"
        >
          <text x="0" y="172" textLength="1000" lengthAdjust="spacingAndGlyphs">
            BOTUNS
          </text>
        </svg>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Botuns Construct Nigeria Limited</p>
          <span>CAC REGISTERED · RC 8525611</span>
          <a href="#main-content" className="footer-top-link">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
