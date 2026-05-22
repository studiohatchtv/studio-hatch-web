import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext.jsx";
import { TICKET_URL } from "../lib/config.js";

export default function Header() {
  const { lang, t, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/sergiler", label: t.nav.exhibitions },
    { to: "/etkinlikler", label: t.nav.events },
    { to: "/atolyeler", label: t.nav.workshops },
    { to: "/magaza", label: t.nav.shop },
    { to: "/hakkimizda", label: t.nav.about },
    { to: "/iletisim", label: t.nav.contact },
  ];

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="studio HATCH" />
          <span className="brand-name">
            studio <b>HATCH</b>
          </span>
        </Link>

        <nav className={`nav ${open ? "open" : ""}`}>
          <div className="nav-links">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="nav-actions">
            <a
              className="btn btn-primary"
              href={TICKET_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t.nav.tickets}
            </a>
          </div>
        </nav>

        <div className="header-right" style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div className="lang-switch">
            <button className={lang === "tr" ? "on" : ""} onClick={() => setLang("tr")}>
              TR
            </button>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
          <button
            className={`menu-toggle ${open ? "open" : ""}`}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
