import { itemTitle, itemImage, itemDesc } from "../lib/content.js";
import { fmtDate } from "../lib/format.js";
import { TICKET_URL } from "../lib/config.js";
import { useLang } from "../i18n/LanguageContext.jsx";

// A generic gradient placeholder when an item has no image.
function Placeholder({ label }) {
  return (
    <div className="cc-media grad-teal cc-placeholder">
      <span>{label}</span>
    </div>
  );
}

export default function ContentCard({ item, showTicket = true, badge }) {
  const { lang, t } = useLang();
  const img = itemImage(item);
  const title = itemTitle(item);
  const desc = itemDesc(item);
  const date = fmtDate(item, lang);
  const ticket = item.ticketUrl || TICKET_URL;
  const tag = badge || item.tag || item.status || item.subkind || item.cat;

  return (
    <article className="card cc reveal">
      {img ? (
        <div className="cc-media">
          <img src={img} alt={title} loading="lazy" />
        </div>
      ) : (
        <Placeholder label={title || "studio HATCH"} />
      )}
      <div className="cc-body">
        {tag && <span className="tag">{tag}</span>}
        <h3 className="cc-title">{title}</h3>
        {date && <p className="cc-date">{date}</p>}
        {desc && <p className="cc-desc">{desc}</p>}
        <div className="cc-foot">
          {typeof item.price !== "undefined" && item.price !== "" && (
            <span className="cc-price">{item.price}</span>
          )}
          {typeof item.spots !== "undefined" && (
            <span className="muted cc-spots">
              {item.spots} {t.pages.workshops.spots}
            </span>
          )}
          {showTicket && (
            <a
              className="btn btn-ghost cc-btn"
              href={ticket}
              target="_blank"
              rel="noreferrer"
            >
              {t.common.tickets}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
