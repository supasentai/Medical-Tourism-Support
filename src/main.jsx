import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const origin = "https://www.symphonyclinic.co.kr";

const images = {
  logo: `${origin}/img/plastic-logo-pc.png`,
  logoMobile: `${origin}/img/plastic-logo-mo.png`,
  hero: `${origin}/img_up/shop_pds/symphonyps/design/images/main/sec01_img.png`,
  early: `${origin}/img/eye_plastic_main02.jpg`,
  eyes: `${origin}/img/eye_plastic_main03.jpg`,
  noDouble: `${origin}/img_up/shop_pds/symphonyps/design/images/main/sec03_img.png`,
  middle: `${origin}/img_up/shop_pds/symphonyps/design/images/main/sec05_img.png`,
  antiAging: `${origin}/img_up/shop_pds/symphonyps/design/images/main/sec06_img.png`,
  clinic: `${origin}/img_up/shop_pds/symphonyps/design/images/main/sec07_img_new.jpg`,
  video: "https://img.youtube.com/vi/kAd1ATih9_k/maxresdefault.jpg",
  skinVideo: "https://img.youtube.com/vi/JFEHZud-NzE/maxresdefault.jpg",
};

const navItems = [
  ["Why Vietnam", "about"],
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
    image: images.early,
  },
  {
    number: "02",
    english: "Care matching",
    title: "Find the right care",
    copy: "We help you compare clinics, specialists and treatment plans\nfor a decision that feels informed.",
    image: images.eyes,
  },
  {
    number: "03",
    english: "Arrival support",
    title: "Arrive with ease",
    copy: "From airport pickup to your first appointment,\nwe coordinate the details around your schedule.",
    image: images.noDouble,
  },
  {
    number: "04",
    english: "Interpretation",
    title: "Be understood",
    copy: "Clear communication before, during and after treatment\nwith language support when you need it.",
    image: images.eyes,
  },
  {
    number: "05",
    english: "Recovery stays",
    title: "Recover comfortably",
    copy: "Choose a calm place to rest, with practical support\nfor your recovery between appointments.",
    image: images.middle,
  },
  {
    number: "06",
    english: "Follow-up care",
    title: "Stay supported",
    copy: "Your journey continues after you return home,\nwith follow-up coordination and clear next steps.",
    image: images.antiAging,
  },
];

const antiAgingItems = [
  ["Visa support", "Fast-track visas", "Quick processing from $100 USD."],
  [
    "Private transfers",
    "24/7 private transfers",
    "Airport, hotel, and hospital rides.",
  ],
  [
    "Hotel booking",
    "Tailored stays",
    "Comfortable stays from $20 USD per night.",
  ],
  [
    "Doctor matching",
    "Find your specialist",
    "Direct connection to specialists for your needs.",
  ],
  [
    "In-hotel nursing",
    "Care where you stay",
    "Professional wound care and dressing changes.",
  ],
  [
    "Custom itineraries",
    "Balance your journey",
    "Travel, surgery, and dining plans shaped around you.",
  ],
];

const videos = [
  [
    "Vietnam care guide",
    images.video,
    "What to expect from a medical journey in Vietnam",
  ],
  [
    "Recovery guide",
    images.skinVideo,
    "How to plan rest and support after treatment",
  ],
  [
    "Destination notes",
    images.clinic,
    "A calmer way to experience care away from home",
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const scrollTo = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenuOpen(false);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const submitConsultation = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };
  const video = videos[activeVideo];

  return (
    <div className="site-shell">
      <header className="site-header">
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
        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
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
            Start planning <Arrow />
          </button>
          <button className="language-button" type="button">
            Language <span>⌄</span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="about">
          <img
            className="hero-image"
            src={images.hero}
            alt="A calm private healthcare setting in Vietnam"
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
            <p>You Don't Have to Do It Alone</p>
            <button
              className="circle-cta"
              type="button"
              onClick={() => scrollTo("services")}
            >
              <span className="circle-cta-label">EXPLORE SUPPORT</span>
              <Arrow />
            </button>
          </div>
        </section>

        <div id="services" aria-label="Signature medical tourism support">
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
                  onClick={() => scrollTo("contact")}
                >
                  <span className="round-link-label">VIEW MORE</span>
                  <Arrow />
                </button>
              </div>
              <div className="story-image-wrap">
                <img src={slide.image} alt={slide.title} />
              </div>
            </section>
          ))}
        </div>

        <section className="philosophy-section">
          <div className="philosophy-art">
            <img
              src={images.clinic}
              alt="A warm consultation space in Vietnam"
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
            />
          </div>
          <div className="anti-aging-list">
            {antiAgingItems.map(([english, title, copy]) => (
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
            <img src={video[1]} alt={video[2]} />
            <div className="play-button">▶</div>
            <div className="media-caption">
              <span>Youtube</span>
              <strong>{video[2]}</strong>
            </div>
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
              Planning your trip? Send us a message to start!
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
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email or WhatsApp"
                    aria-label="Email or WhatsApp"
                    required
                  />
                </div>
                <textarea
                  placeholder="What kind of support are you looking for?"
                  aria-label="Support request"
                  rows="3"
                  required
                ></textarea>
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
