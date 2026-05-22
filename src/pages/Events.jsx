import { useLang } from "../i18n/LanguageContext.jsx";
import { useContent } from "../lib/content.js";
import { useReveal } from "../lib/useReveal.js";
import ContentCard from "../components/ContentCard.jsx";
import Newsletter from "../components/Newsletter.jsx";

export default function Events() {
  const { t } = useLang();
  const { content, loading } = useContent();
  useReveal([loading]);
  const p = t.pages.events;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.title}</h1>
          <p className="lead">{p.lead}</p>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="container">
          {loading ? (
            <div className="skeleton-grid">
              <div className="skeleton" /><div className="skeleton" /><div className="skeleton" />
            </div>
          ) : content.events.length ? (
            <div className="grid grid-3">
              {content.events.map((it) => (
                <ContentCard key={it.id} item={it} />
              ))}
            </div>
          ) : (
            <p className="state">{p.empty}</p>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
