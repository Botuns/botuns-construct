import { ArrowUpRight } from "lucide-react";
export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="commitment-section">
      <div className="site-shell commitment-grid">
        <p className="eyebrow">05 / OUR COMMITMENT</p>
        <div>
          <h2>
            “The best thing we can build
            <br />
            is your confidence in us.”
          </h2>
          <div className="commitment-bottom">
            <p>
              Clear communication. Thoughtful workmanship.
              <br />A shared commitment to getting it right.
            </p>
            <a className="text-link" href="#contact">
              Let’s start a conversation <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
