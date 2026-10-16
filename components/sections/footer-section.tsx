import { ArrowUpRight } from "lucide-react";
export default function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-top">
          <a href="#home" className="footer-wordmark">
            BOTUNS<span>CONSTRUCT NIGERIA LIMITED</span>
          </a>
          <p>
            Strong foundations.
            <br />
            Lasting relationships.
          </p>
          <a href="#home" className="text-link">
            Back to top <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Botuns Construct Nigeria Limited</p>
          <div>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <span>CAC REGISTERED · RC 8525611</span>
        </div>
      </div>
    </footer>
  );
}
