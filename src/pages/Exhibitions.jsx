import { useLang } from "../i18n/LanguageContext.jsx";
import { useContent, splitExhibitions } from "../lib/content.js";
import { useReveal } from "../lib/useReveal.js";
import ContentCard from "../components/ContentCard.jsx";

function Group({ title, eyebrow, items, emptyText }) {
  return (
    <section className="section-pad" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="reveal" style={{ marginBottom: 40 }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-title">{title}</h2>
        </div>
        {items.length ? (
          <div className="grid grid-3">
            {items.map((it) => (
              <ContentCard key={it.id} item={it} />
            ))}
          </div>
        ) : (
          <p className="state">{emptyText}</p>
        )}
      </div>
    </section>
  );
}

export default function Exhibitions() {
  const { t } = useLang();
  const { content, loading } = useContent();
  useReveal([loading]);
  const p = t.pages.exhibitions;
  const { immersive, digital } = splitExhibitions(content.exhibitions);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.title}</h1>
          <p className="lead">{p.lead}</p>
        </div>
      </section>

      {loading ? (
        <div className="container section-pad" style={{ paddingTop: 0 }}>
          <div className="skeleton-grid">
            <div className="skeleton" /><div className="skeleton" /><div className="skeleton" />
          </div>
        </div>
      ) : (
        <>
          <Group
            title={p.immersiveTitle}
            eyebrow="immersive"
            items={immersive}
            emptyText={p.empty}
          />
          <Group
            title={p.digitalTitle}
            eyebrow="digital art"
            items={digital}
            emptyText={p.empty}
          />
        </>
      )}
    </>
  );
}
