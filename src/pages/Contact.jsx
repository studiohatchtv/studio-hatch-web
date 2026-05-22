import { useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useReveal } from "../lib/useReveal.js";
import { SOCIAL } from "../lib/config.js";

export default function Contact() {
  const { t } = useLang();
  useReveal([]);
  const p = t.pages.contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`studio HATCH — ${form.name || "İletişim"}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name} · ${form.email}`);
    window.location.href = `mailto:${SOCIAL.email}?subject=${subject}&body=${body}`;
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

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
        <div className="container contact-split">
          <div className="reveal">
            <dl className="contact-info">
              <dt>{p.emailLabel}</dt>
              <dd>
                <a href={`mailto:${SOCIAL.email}`}>{SOCIAL.email}</a>
              </dd>
              <dt>{p.addressLabel}</dt>
              <dd>{p.addressValue}</dd>
              <dt>{p.socialLabel}</dt>
              <dd>
                <a href={SOCIAL.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </dd>
            </dl>
          </div>

          <form className="reveal" onSubmit={submit}>
            <div className="field">
              <label htmlFor="c-name">{p.formName}</label>
              <input id="c-name" value={form.name} onChange={set("name")} required />
            </div>
            <div className="field">
              <label htmlFor="c-email">{p.formEmail}</label>
              <input id="c-email" type="email" value={form.email} onChange={set("email")} required />
            </div>
            <div className="field">
              <label htmlFor="c-msg">{p.formMessage}</label>
              <textarea id="c-msg" rows={5} value={form.message} onChange={set("message")} required />
            </div>
            <button className="btn btn-primary" type="submit">{p.formSend}</button>
            <p className="muted" style={{ marginTop: 14, fontSize: "0.85rem" }}>{p.formNote}</p>
          </form>
        </div>
      </section>
    </>
  );
}
