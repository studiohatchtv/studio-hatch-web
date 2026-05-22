import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext.jsx";
import { SOCIAL } from "../lib/config.js";
import StoreBadges from "./StoreBadges.jsx";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="studio HATCH" />
          <p>{t.footer.tagline}</p>
          <p className="muted store-hint">{t.extras.audio.appHint}</p>
          <StoreBadges />
        </div>

        <div className="footer-col">
          <h4>{t.footer.explore}</h4>
          <Link to="/sergiler">{t.nav.exhibitions}</Link>
          <Link to="/etkinlikler">{t.nav.events}</Link>
          <Link to="/atolyeler">{t.nav.workshops}</Link>
          <Link to="/magaza">{t.nav.shop}</Link>
          <Link to="/hakkimizda">{t.nav.about}</Link>
        </div>

        <div className="footer-col">
          <h4>{t.footer.visit}</h4>
          <Link to="/iletisim">{t.nav.contact}</Link>
          <a href={`mailto:${SOCIAL.email}`}>{SOCIAL.email}</a>
        </div>

        <div className="footer-col">
          <h4>{t.footer.follow}</h4>
          <a href={SOCIAL.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} studio HATCH. {t.footer.rights}</span>
        <span className="muted">studio HATCH Immersive · Digital Art</span>
      </div>
    </footer>
  );
}
