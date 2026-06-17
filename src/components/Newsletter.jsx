import { useLang } from "../i18n/LanguageContext.jsx";
import SignupForm from "./SignupForm.jsx";

export default function Newsletter() {
  const { t } = useLang();
  const n = t.pages.newsletter;

  return (
    <section className="section-pad">
      <div className="container">
        <div className="newsletter reveal">
          <span className="eyebrow" style={{ color: "#bdeef6" }}>
            {n.eyebrow}
          </span>
          <h2 style={{ marginTop: 16 }}>{n.title}</h2>
          <p>{n.desc}</p>
          <SignupForm source="website" />
        </div>
      </div>
    </section>
  );
}
