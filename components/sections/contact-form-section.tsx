"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
const email = "botunsconstructlimited@gmail.com";
export default function ContactFormSection() {
  const [prepared, setPrepared] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Project enquiry: ${data.get("projectType")}`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return (
    <section id="contact-form" className="section-pad contact-form-section">
      <div className="site-shell contact-grid">
        <div>
          <p className="eyebrow">LET’S TALK DETAILS</p>
          <h2>
            Every great project
            <br />
            starts here.
          </h2>
          <p className="contact-intro">
            Tell us what you have in mind. Whether you’re planning a new build,
            looking for a property or sourcing materials, we’re ready to help.
          </p>
          <div className="contact-details">
            <div>
              <span>VISIT OUR OFFICE</span>
              <p>
                KM 13, Lagos-Ibadan Express Way
                <br />
                Sonel Bonel, Ibadan, Oyo State, Nigeria
              </p>
            </div>
            <div>
              <span>GIVE US A CALL</span>
              <a href="tel:+2348034706314">+234 803 470 6314</a>
              <a href="tel:+2349015903818">+234 901 590 3818</a>
            </div>
            <div>
              <span>EMAIL US</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div>
              <span>OFFICE HOURS</span>
              <p>
                Mon–Fri · 8am–6pm
                <br />
                Saturday · 9am–4pm
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={submit} className="enquiry-form">
          <div className="form-row">
            <label htmlFor="name">
              Full name <span>*</span>
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                required
                maxLength={120}
              />
            </label>
            <label htmlFor="email">
              Email address <span>*</span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                maxLength={180}
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="phone">
              Phone number
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+234"
                maxLength={40}
              />
            </label>
            <label htmlFor="projectType">
              How can we help? <span>*</span>
              <select
                id="projectType"
                name="projectType"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                {[
                  "Building Construction",
                  "Renovation & Repairs",
                  "Property Development",
                  "Supply & Procurement",
                  "General Merchandising",
                  "Consultation",
                  "Other",
                ].map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>
          <label htmlFor="message">
            Tell us about your project <span>*</span>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your ideas, location and any timelines you have in mind…"
              required
              maxLength={1800}
            />
          </label>
          <p className="form-note">
            This opens your email app with your enquiry ready to send.
          </p>
          <button className="button button-dark" type="submit">
            Prepare enquiry <ArrowUpRight size={18} />
          </button>
          {prepared && (
            <p role="status" className="form-status">
              Your email draft is ready to open. Send it from your email app to
              complete your enquiry. If no app opens, email us at{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
