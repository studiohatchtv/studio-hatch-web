import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useContent } from "../lib/content.js";
import { useReveal } from "../lib/useReveal.js";
import { TICKET_URL } from "../lib/config.js";
import ContentCard from "../components/ContentCard.jsx";
import Newsletter from "../components/Newsletter.jsx";
import StoreBadges from "../components/StoreBadges.jsx";

export default function Home() {
  const { t } = useLang();
  const { content, loading } = useContent();
  useReveal([loading]);

  const highlights = [...content.exhibitions, ...content.events].slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="container hero-inner">
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1>
            {t.hero.title} <span className="accent glow-text">{t.hero.titleAccent}</span>
          </h1>
          <p>{t.hero.subtitle}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href={TICKET_URL} target="_blank" rel="noreferrer">
              {t.hero.ctaTickets}
            </a>
            <Link className="btn btn-ghost" to="/sergiler">
              {t.hero.ctaExplore}
            </Link>
          </div>
        </div>
        <div className="scroll-hint">scroll ↓</div>
      </section>

      {/* Pillars */}
      <section className="section-pad">
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">studio HATCH</span>
            <h2 className="section-title">{t.pillars.title}</h2>
            <p className="lead" style={{ marginTop: 16 }}>{t.pillars.lead}</p>
          </div>
          <div className="grid grid-2 pillars-grid">
            <article className="card pillar grad-teal reveal">
              <span className="pillar-num">01</span>
              <h3>{t.pillars.immersive.name}</h3>
              <p>{t.pillars.immersive.desc}</p>
              <Link className="btn btn-ghost" to="/sergiler">{t.common.learnMore}</Link>
            </article>
            <article className="card pillar grad-teal reveal">
              <span className="pillar-num">02</span>
              <h3>{t.pillars.digital.name}</h3>
              <p>{t.pillars.digital.desc}</p>
              <Link className="btn btn-ghost" to="/sergiler">{t.common.learnMore}</Link>
            </article>
          </div>
        </div>
      </section>

      <div className="container"><hr className="divider" /></div>

      {/* Highlights */}
      <section className="section-pad">
        <div className="container">
          <div className="sec-head">
            <div className="reveal">
              <span className="eyebrow">{t.highlights.eyebrow}</span>
              <h2 className="section-title">{t.highlights.title}</h2>
            </div>
            <Link className="btn btn-ghost reveal" to="/sergiler">{t.highlights.viewAll}</Link>
          </div>

          {loading ? (
            <div className="skeleton-grid">
              <div className="skeleton" /><div className="skeleton" /><div className="skeleton" />
            </div>
          ) : highlights.length ? (
            <div className="grid grid-3">
              {highlights.map((it) => (
                <ContentCard key={it.id} item={it} />
              ))}
            </div>
          ) : (
            <p className="state">{t.highlights.empty}</p>
          )}
        </div>
      </section>

      {/* Workshops teaser */}
      <section className="section-pad">
        <div className="container">
          <div className="teaser reveal">
            <div>
              <span className="eyebrow">{t.workshopsTeaser.eyebrow}</span>
              <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,3.4vw,2.8rem)" }}>
                {t.workshopsTeaser.title}
              </h2>
              <p className="lead" style={{ marginTop: 18 }}>{t.workshopsTeaser.desc}</p>
              <Link className="btn btn-primary" to="/atolyeler" style={{ marginTop: 28 }}>
                {t.workshopsTeaser.cta}
              </Link>
            </div>
            <div className="teaser-visual grad-teal glow-text">hatch atölyeler</div>
          </div>
        </div>
      </section>

      {/* Extras: shop + audio */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-2 extras-grid">
            <Link to="/magaza" className="card extra reveal">
              <span className="tag">hatch shop</span>
              <h3>{t.extras.shop.name}</h3>
              <p>{t.extras.shop.desc}</p>
              <span className="extra-cta">{t.common.learnMore} →</span>
            </Link>
            <article className="card extra reveal">
              <span className="tag">audio guide</span>
              <h3>{t.extras.audio.name}</h3>
              <p>{t.extras.audio.desc}</p>
              <p className="muted store-hint">{t.extras.audio.appHint}</p>
              <StoreBadges />
            </article>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
