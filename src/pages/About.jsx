import { useLang } from "../i18n/LanguageContext.jsx";
import { useContent } from "../lib/content.js";
import { useReveal } from "../lib/useReveal.js";

export default function About() {
  const { t } = useLang();
  const { content } = useContent();
  useReveal([content.about]);
  const p = t.pages.about;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.title}</h1>
          <p className="lead">{p.lead}</p>
        </div>
      </section>

      {/* Manifesto + intro (intro text falls back to Supabase `settings.about`) */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="container about-split reveal">
          <h2 className="about-manifesto">{p.manifestoTitle}</h2>
          <div>
            <p className="lead">{p.manifesto}</p>
            {content.about && (
              <p className="lead" style={{ marginTop: 20 }}>{content.about}</p>
            )}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: 40 }}>
            <span className="eyebrow">studio HATCH</span>
            <h2 className="section-title">{p.valuesTitle}</h2>
          </div>
          <div className="grid grid-2">
            {p.values.map((v, i) => (
              <div className="value reveal" key={i}>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
