import { useLang } from "../i18n/LanguageContext.jsx";
import SignupForm from "../components/SignupForm.jsx";
import { SOCIAL } from "../lib/config.js";

const LOGO = `${import.meta.env.BASE_URL}logo-wordmark.png`;
const FRIDA = `${import.meta.env.BASE_URL}frida.png`;

export default function ComingSoon() {
  const { lang, t, setLang } = useLang();
  const c = t.comingSoon;

  return (
    <div className="cs">
      {/* repeating H motif from the facade */}
      <div className="cs-pattern" aria-hidden="true" />
      <div className="cs-glow" aria-hidden="true" />

      <header className="cs-top">
        <div className="lang-switch">
          <button className={lang === "tr" ? "on" : ""} onClick={() => setLang("tr")}>
            TR
          </button>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
            EN
          </button>
        </div>
      </header>

      <main className="cs-main">
        <span className="cs-badge">{c.badge}</span>

        <img className="cs-wordmark-logo" src={LOGO} alt="studio HATCH" />

        <p className="cs-sub">{c.sub}</p>

        <div className="cs-opening">
          <img className="cs-opening-img" src={FRIDA} alt={c.openingTitle} />
          <div className="cs-opening-body">
            <span className="tag">{c.openingLabel}</span>
            <h2 className="cs-opening-title">{c.openingTitle}</h2>
            <blockquote className="cs-quote">
              “{c.quote}”
              <cite>— {c.quoteAuthor}</cite>
            </blockquote>
          </div>
        </div>

        <div className="cs-waitlist">
          <p>{c.waitlist}</p>
          <SignupForm source="coming_soon" />
        </div>
      </main>

      <footer className="cs-foot">
        <a href={SOCIAL.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href={`mailto:${SOCIAL.email}`}>{SOCIAL.email}</a>
      </footer>
    </div>
  );
}
