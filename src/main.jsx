import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const origin = "https://www.symphonyclinic.co.kr";

const images = {
  logo: `${origin}/img/plastic-logo-pc.png`,
  logoMobile: `${origin}/img/plastic-logo-mo.png`,
  hero: "/images/hero.jpg",
  early: `${origin}/img/eye_plastic_main02.jpg`,
  eyes: `${origin}/img/eye_plastic_main03.jpg`,
  noDouble: `${origin}/img_up/shop_pds/symphonyps/design/images/main/sec03_img.png`,
  middle: `${origin}/img_up/shop_pds/symphonyps/design/images/main/sec05_img.png`,
  antiAging: `${origin}/img_up/shop_pds/symphonyps/design/images/main/sec06_img.png`,
  clinic: "/images/assist.jpeg",
  vietnamLandmarks:
    "/images/vecteezy_vietnam-famous-landmark-silhouette-recolored.png",
  video: "https://img.youtube.com/vi/kAd1ATih9_k/maxresdefault.jpg",
  careGuide: "/images/vietnam-care-guide.jpg",
  skinVideo: "https://img.youtube.com/vi/JFEHZud-NzE/maxresdefault.jpg",
  recoveryGuide: "/images/recovery-guide.png",
};

const navItems = [
  ["Why Vietnam", "why-vietnam"],
  ["Before you fly", "service-01"],
  ["Care options", "service-02"],
  ["Local coordination", "service-04"],
  ["Recovery stays", "service-05"],
  ["For companions", "service-06"],
  ["How it works", "anti-aging"],
  ["Destinations", "media"],
];

const serviceSlides = [
  {
    number: "01",
    english: "Before you fly",
    title: "Plan with clarity",
    copy: "Understand your care options, timeline and budget\nbefore you book a flight to Vietnam.",
    image: "/images/slide-01.jpg",
    details: ["Care timeline and budget planning", "Initial questions prepared before you fly", "Clear next steps for your first conversation"],
  },
  {
    number: "02",
    english: "Care matching",
    title: "Find the right care",
    copy: "We help you compare clinics, specialists and treatment plans\nfor a decision that feels informed.",
    image: "/images/slide-02.jpg",
    details: ["Specialist and clinic comparisons", "Treatment questions organized for you", "A practical shortlist to discuss"],
  },
  {
    number: "03",
    english: "Arrival support",
    title: "Arrive with ease",
    copy: "From airport pickup to your first appointment,\nwe coordinate the details around your schedule.",
    image: "/images/slide-03.jpg",
    details: ["Airport pickup coordination", "Hotel and hospital transfers", "Arrival timing planned around appointments"],
  },
  {
    number: "04",
    english: "Interpretation",
    title: "Be understood",
    copy: "Clear communication before, during and after treatment\nwith language support when you need it.",
    image: "/images/slide-04.jpeg",
    details: ["Language support when needed", "Questions prepared for appointments", "Practical updates shared clearly"],
  },
  {
    number: "05",
    english: "Recovery stays",
    title: "Recover comfortably",
    copy: "Choose a calm place to rest, with practical support\nfor your recovery between appointments.",
    image: "/images/slide-05.jpeg",
    details: ["Recovery-friendly accommodation options", "In-hotel nursing by arrangement", "Transport planned around rest"],
  },
  {
    number: "06",
    english: "Follow-up care",
    title: "Stay supported",
    copy: "Your journey continues after you return home,\nwith follow-up coordination and clear next steps.",
    image: "/images/slide-06.jpg",
    details: ["Follow-up coordination", "Recovery questions organized", "Clear next steps after your return"],
  },
];

const antiAgingItems = [
  ["Visa support", "Fast-track visas", "Quick processing", "From $100 USD"],
  [
    "Private transfers",
    "24/7 private transfers",
    "Airport, hotel, and hospital rides",
    "Available 24/7",
  ],
  [
    "Hotel booking",
    "Tailored stays",
    "Comfortable stays",
    "From $20 USD / night",
  ],
  [
    "Doctor matching",
    "Find your specialist",
    "Direct connection to specialists",
    "Matched to your needs",
  ],
  [
    "In-hotel nursing",
    "Care where you stay",
    "Professional wound care",
    "By arrangement",
  ],
  [
    "Custom itineraries",
    "Balance your journey",
    "Travel, surgery, and dining plans",
    "Built around you",
  ],
];

const videos = [
  [
    "Destination notes",
    images.vietnamLandmarks,
    "Vietnam landmarks to explore around your care journey",
    "https://www.youtube.com/watch?v=kAd1ATih9_k",
  ],
  [
    "Vietnam care guide",
    images.careGuide,
    "What to expect from a medical journey in Vietnam",
    "https://www.youtube.com/watch?v=JFEHZud-NzE",
  ],
  [
    "Recovery guide",
    images.recoveryGuide,
    "How to plan rest and support after treatment",
    "https://www.youtube.com/watch?v=kAd1ATih9_k",
  ],
];

const journeySteps = [
  ["01", "Plan", "service-01"],
  ["02", "Match", "service-02"],
  ["03", "Arrive", "service-03"],
  ["04", "Treat", "service-04"],
  ["05", "Recover", "service-05"],
  ["06", "Follow up", "service-06"],
];

const faqItems = [
  [
    "Can you help before I book my flight?",
    "Yes. We can help you map out care options, timing, budget and practical arrival details before you travel.",
  ],
  [
    "Do I need to choose a clinic first?",
    "No. Share what you are looking for and we can help you understand suitable specialists and care settings.",
  ],
  [
    "Can a companion join the planning?",
    "Of course. Transport, accommodation and a simple day-by-day plan can be shaped for both patients and companions.",
  ],
];

function Arrow({ up = false }) {
  return (
    <span className={up ? "arrow arrow-up" : "arrow"} aria-hidden="true">
      {up ? "⌃" : "↗"}
    </span>
  );
}

function App() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const submitConsultation = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };
  const requestSupport = (slide) => {
    setSelectedSupport(`${slide.english}: ${slide.title}`);
    scrollTo("contact");
  };
  const video = videos[activeVideo];

  return (
    <div className="site-shell">
      <header className={`site-header ${isMenuOpen ? "menu-open" : ""}`}>
        <button
          className="brand-button"
          type="button"
          onClick={() => scrollTo("top")}
          aria-label="Medical tourism support home"
        >
          <span className="text-wordmark">
            <strong>MEDICAL TOURISM</strong>
            <em>VIETNAM SUPPORT</em>
          </span>
        </button>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(([label, target]) => (
            <button type="button" key={label} onClick={() => scrollTo(target)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="skin-link"
            type="button"
            onClick={() => scrollTo("contact")}
          >
            <span className="skin-link-label">Start planning</span>
            <Arrow />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="about">
          <img
            className="hero-image"
            src={images.hero}
            alt="A calm private healthcare setting in Vietnam"
            fetchPriority="high"
            width="2400"
            height="1400"
          />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-mark">V</div>
            <p className="hero-label">Medical tourism support in Vietnam</p>
            <h1>
              Coming to Vietnam
              <br />
              <span>for Beauty?</span>
            </h1>
            <p>Plan your care journey with local support from arrival to home.</p>
            <button
              className="circle-cta"
              type="button"
              onClick={() => scrollTo("services")}
            >
              <span className="circle-cta-label">START PLANNING</span>
              <Arrow />
            </button>
          </div>
        </section>

        <section className="trust-strip" aria-label="Support at a glance">
          <div>
            <strong>24/7</strong>
            <span>Private support</span>
          </div>
          <div>
            <strong>EN</strong>
            <span>Clear communication</span>
          </div>
          <div>
            <strong>3</strong>
            <span>Vietnam care hubs</span>
          </div>
          <div>
            <strong>01</strong>
            <span>Journey coordinator</span>
          </div>
        </section>

        <div id="services" aria-label="Signature medical tourism support">
          <nav className="journey-rail" aria-label="Care journey steps">
            {journeySteps.map(([number, label, target]) => (
              <button type="button" key={target} onClick={() => scrollTo(target)}>
                <span>{number}</span>
                {label}
              </button>
            ))}
          </nav>
          {serviceSlides.map((slide, index) => (
            <section
              id={`service-${slide.number}`}
              className={`service-story ${index % 2 === 0 ? "image-left" : "image-right"}`}
              key={slide.number}
            >
              <div className="story-number">{slide.number}</div>
              <div className="story-copy">
                <p className="eyebrow">{slide.english}</p>
                <h2>{slide.title}</h2>
                <p className="story-description">{slide.copy}</p>
                <button
                  className="round-link"
                  type="button"
                  onClick={() => setSelectedServiceDetail(slide)}
                  aria-label={`View details for ${slide.title}`}
                >
                  <span className="round-link-label">VIEW MORE</span>
                  <Arrow />
                </button>
              </div>
              <div className="story-image-wrap">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  width="1200"
                  height="800"
                />
              </div>
            </section>
          ))}
        </div>

        <section className="philosophy-section">
          <div className="philosophy-art">
            <img
              src={images.clinic}
              alt="A warm consultation space in Vietnam"
              loading="lazy"
              width="1200"
              height="900"
            />
          </div>
          <div className="philosophy-copy">
            <p className="eyebrow">Medical tourism support in Vietnam</p>
            <h2>
              You don't have to
              <br />
              <span>do it alone.</span>
            </h2>
            <p>
              Considering cosmetic or dental work in Vietnam? From trip prep and
              airport pickup to treatment and recovery, we're with you every
              step of the way.
            </p>
            <div className="experience">
              <strong>3</strong>
              <span>
                CARE HUBS
                <br />
                TO EXPLORE
              </span>
            </div>
          </div>
        </section>

        <section className="timeline-section" id="journey" aria-labelledby="journey-title">
          <div className="timeline-intro">
            <p className="eyebrow">Your care journey</p>
            <h2 id="journey-title">
              One clear path,
              <br />
              <span>step by step.</span>
            </h2>
            <p>
              Good support makes the journey feel considered before you ever
              board the flight.
            </p>
          </div>
          <div className="timeline-list">
            {serviceSlides.map((slide, index) => (
              <button
                className="timeline-step"
                type="button"
                key={slide.number}
                onClick={() => scrollTo(`service-${slide.number}`)}
              >
                <span className="timeline-step-number">{slide.number}</span>
                <span className="timeline-step-copy">
                  <small>{slide.english}</small>
                  <strong>{slide.title}</strong>
                </span>
                <span className="timeline-step-line" aria-hidden="true">
                  {index < serviceSlides.length - 1 ? "→" : "✓"}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="why-vietnam-section" id="why-vietnam" aria-labelledby="why-vietnam-title">
          <div className="why-vietnam-heading">
            <p className="eyebrow">Why Vietnam</p>
            <h2 id="why-vietnam-title">
              Care that leaves
              <br />
              <span>room to breathe.</span>
            </h2>
          </div>
          <div className="why-vietnam-grid">
            <article>
              <span>01</span>
              <h3>Compare with clarity</h3>
              <p>Understand your options, timing and next steps before making a decision.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Stay understood</h3>
              <p>Keep communication practical with language and local coordination when needed.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Recover at your pace</h3>
              <p>Plan calm stays, transport and support around the rhythm of your recovery.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Make the trip yours</h3>
              <p>Leave room for good food, gentle exploring and the people traveling with you.</p>
            </article>
          </div>
        </section>

        <section className="testimonial-section" aria-labelledby="testimonial-title">
          <div className="testimonial-image">
            <img
              src="/images/testimonial-placeholder.png"
              alt="Placeholder portrait for a future patient testimonial"
              loading="lazy"
              width="900"
              height="1200"
            />
          </div>
          <div className="testimonial-copy">
            <p className="eyebrow">Sample testimonial</p>
            <h2 id="testimonial-title">
              A calmer way
              <br />
              <span>to make a big decision.</span>
            </h2>
            <blockquote>
              “The planning felt clear, calm and personal from my first message
              to the day I flew home.”
            </blockquote>
            <p className="testimonial-placeholder">
              Placeholder quote. Replace with an approved patient story before launch.
            </p>
          </div>
        </section>

        <section className="anti-aging-section" id="anti-aging">
          <div className="anti-aging-intro">
            <p className="eyebrow">Medical tourism support in Vietnam</p>
            <h2>
              Focus on your
              <br />
              <span>glow-up.</span>
            </h2>
            <p>
              From your first question to your return home, we'll handle the
              rest.
            </p>
          </div>
          <div className="anti-aging-visual">
            <img
              src={images.antiAging}
              alt="A consultation and care planning moment in Vietnam"
              loading="lazy"
              width="1200"
              height="1000"
            />
          </div>
          <div className="anti-aging-list">
            {antiAgingItems.map(([english, title, copy, detail]) => (
              <button
                type="button"
                className="anti-item"
                key={title}
                onClick={() => scrollTo("contact")}
              >
                <span>
                  <small>{english}</small>
                  <strong>{title}</strong>
                  <em>{copy}</em>
                  <b>{detail}</b>
                </span>
                <Arrow />
              </button>
            ))}
          </div>
        </section>

        <section className="media-section" id="media">
          <div className="media-heading">
            <p className="eyebrow">Vietnam, beyond the appointment</p>
            <h2>
              Prepare for the journey
              <br />
              <span>with confidence.</span>
            </h2>
            <div className="media-tabs">
              {videos.map(([label], index) => (
                <button
                  type="button"
                  className={index === activeVideo ? "is-active" : ""}
                  key={label}
                  onClick={() => setActiveVideo(index)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="media-feature">
            <img
              src={video[1]}
              alt={video[2]}
              loading="lazy"
              width="1400"
              height="900"
            />
            <a
              className="play-button"
              href={video[3]}
              target="_blank"
              rel="noreferrer"
              aria-label={`Watch ${video[0]}`}
            >
              ▶
            </a>
            <div className="media-caption">
              <span>Youtube</span>
              <strong>{video[2]}</strong>
            </div>
          </div>
        </section>

        <section className="faq-section" aria-labelledby="faq-title">
          <div className="faq-intro">
            <p className="eyebrow">Before you book</p>
            <h2 id="faq-title">
              Start with a
              <br />
              <span>clear answer.</span>
            </h2>
            <p>
              A few practical answers before you decide whether Vietnam is the
              right next step for your care journey.
            </p>
          </div>
          <div className="faq-list">
            {faqItems.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-map">
            <iframe
              title="Medical tourism destinations in Vietnam"
              src="https://www.google.com/maps?q=Ho%20Chi%20Minh%20City%2C%20Vietnam&output=embed"
              loading="lazy"
            ></iframe>
            <div className="address-block">
              <p className="eyebrow">Destinations</p>
              <h3>Vietnam care hubs</h3>
              <p>
                Ho Chi Minh City
                <br />
                Hanoi　Da Nang
              </p>
              <button type="button" onClick={() => scrollTo("contact")}>
                Ask about destinations <Arrow />
              </button>
            </div>
          </div>
          <div className="contact-panel">
            <p className="eyebrow">Start a conversation</p>
            <h2>Plan your care in Vietnam.</h2>
            <p className="contact-prompt">
              {selectedSupport
                ? `Tell us more about ${selectedSupport.toLowerCase()}.`
                : "Planning your trip? Send us a message to start!"}
            </p>
            <div className="hours">
              <h3>Support availability</h3>
              <p>
                Pre-arrival planning <span>Available daily</span>
              </p>
              <p>
                On-the-ground support <span>By arrangement</span>
              </p>
              <small>
                Response times depend on your travel dates and care needs.
              </small>
            </div>
            {submitted ? (
              <div className="submit-success">
                <strong>Your journey request has been received.</strong>
                <span>We will be in touch with practical next steps.</span>
              </div>
            ) : (
              <form className="consult-form" onSubmit={submitConsultation}>
                <h3>Tell us what you need</h3>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Name"
                    aria-label="Name"
                    name="name"
                    autoComplete="name"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email or WhatsApp"
                    aria-label="Email or WhatsApp"
                    name="contact"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="sr-only" htmlFor="support-type">
                    Support needed
                  </label>
                  <select id="support-type" name="support-type" defaultValue="" required>
                    <option value="" disabled>
                      Support needed
                    </option>
                    <option value="care-options">Care options</option>
                    <option value="arrival">Airport and arrival support</option>
                    <option value="doctor-matching">Doctor matching</option>
                    <option value="recovery">Recovery and nursing</option>
                    <option value="full-journey">Full journey planning</option>
                  </select>
                  <label className="sr-only" htmlFor="travel-date">
                    Expected travel date
                  </label>
                  <input
                    id="travel-date"
                    type="date"
                    name="travel-date"
                    aria-label="Expected travel date"
                  />
                </div>
                <div className="form-row">
                  <label className="sr-only" htmlFor="budget">
                    Estimated budget
                  </label>
                  <select id="budget" name="budget" defaultValue="" required>
                    <option value="" disabled>
                      Estimated budget
                    </option>
                    <option value="planning">Still planning</option>
                    <option value="under-3000">Under $3,000</option>
                    <option value="3000-7000">$3,000 to $7,000</option>
                    <option value="over-7000">Over $7,000</option>
                  </select>
                  <label className="sr-only" htmlFor="companions">
                    Traveling with a companion
                  </label>
                  <select id="companions" name="companions" defaultValue="" required>
                    <option value="" disabled>
                      Traveling with a companion?
                    </option>
                    <option value="solo">Traveling solo</option>
                    <option value="one-companion">One companion</option>
                    <option value="group">Two or more companions</option>
                  </select>
                </div>
                <textarea
                  placeholder="What kind of support are you looking for?"
                  aria-label="Support request"
                  name="support-request"
                  rows="3"
                  required
                ></textarea>
                <p className="form-note">
                  Share only what you are comfortable discussing. We will reply
                  with practical next steps.
                </p>
                <label className="agree">
                  <input type="checkbox" required /> I agree to be contacted
                  about my request.
                </label>
                <button type="submit">
                  Request support <Arrow />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {selectedServiceDetail && (
        <div
          className="service-detail-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedServiceDetail(null);
          }}
        >
          <section
            className="service-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-detail-title"
          >
            <button
              className="service-detail-close"
              type="button"
              aria-label="Close service details"
              onClick={() => setSelectedServiceDetail(null)}
            >
              ×
            </button>
            <p className="eyebrow">{selectedServiceDetail.english}</p>
            <h2 id="service-detail-title">{selectedServiceDetail.title}</h2>
            <p>{selectedServiceDetail.copy}</p>
            <ul>
              {selectedServiceDetail.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <button
              className="modal-cta"
              type="button"
              onClick={() => {
                const detail = selectedServiceDetail;
                setSelectedServiceDetail(null);
                requestSupport(detail);
              }}
            >
              Request this support <Arrow />
            </button>
          </section>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="text-wordmark">
            <strong>MEDICAL TOURISM</strong>
            <em>VIETNAM SUPPORT</em>
          </span>
          <p>Clearer care journeys, from arrival to home.</p>
        </div>
        <div className="footer-links">
          <button type="button" onClick={() => scrollTo("about")}>
            Why Vietnam
          </button>
          <button type="button" onClick={() => scrollTo("services")}>
            Care options
          </button>
          <button type="button" onClick={() => scrollTo("media")}>
            Destination notes
          </button>
          <button type="button" onClick={() => scrollTo("contact")}>
            Request support
          </button>
        </div>
        <div className="footer-company">
          <p>Medical tourism support in Vietnam</p>
          <p>
            Independent coordination for international patients
            <br />
            Clinic matching, interpretation and local logistics
          </p>
          <p>Ho Chi Minh City　Hanoi　Da Nang</p>
        </div>
        <div className="footer-bottom">
          <span>Medical Tourism Support in Vietnam</span>
          <span>Privacy policy　Consent　Accessibility</span>
        </div>
      </footer>
      <div className="floating-tools">
        <button
          type="button"
          onClick={() => scrollTo("contact")}
          aria-label="Request support"
        >
          ✦
        </button>
        <button
          type="button"
          onClick={() => scrollTo("top")}
          aria-label="Back to top"
        >
          <Arrow up />
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
