import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function AboutSection() {
  return (
    <section id="about" className="section-pad about-section">
      <div className="site-shell">
        <div className="section-grid">
          <p className="eyebrow">01 / WHO WE ARE</p>
          <div>
            <h2>
              A new name.
              <br />A wealth of experience.
            </h2>
            <div className="about-copy">
              <div>
                <p>
                  We are Botuns Construct Nigeria Limited, an Ibadan-based
                  construction, property and supply company. Incorporated in
                  2025, we bring over 18 years of combined founding experience
                  to every project.
                </p>
                <Link className="text-link" href="/meet-the-ceo">
                  Meet our founder &amp; CEO <ArrowUpRight size={18} />
                </Link>
              </div>
              <div>
                <p>
                  Our approach is straightforward: understand your vision, plan
                  with care and deliver work that stands the test of time.
                </p>
                <a className="text-link" href="#why-choose-us">
                  The way we work <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="stats-grid">
          <div>
            <strong>
              18<span>+</span>
            </strong>
            <p>
              Years of combined
              <br />
              leadership experience
            </p>
          </div>
          <div>
            <strong>
              30<span>+</span>
            </strong>
            <p>
              Trusted vendor
              <br />
              relationships
            </p>
          </div>
          <div>
            <strong>2025</strong>
            <p>
              Year of incorporation
              <br />
              CAC · RC 8525611
            </p>
          </div>
          <div>
            <strong>One</strong>
            <p>
              Committed partner.
              <br />
              From start to finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
