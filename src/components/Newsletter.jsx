import { useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { supabase } from "../lib/supabase.js";

export default function Newsletter() {
  const { lang, t } = useLang();
  const n = t.pages.newsletter;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle|sending|ok|already|invalid|error

  const submit = async (e) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: value, lang, source: "website" });
    if (!error) {
      setStatus("ok");
      setEmail("");
    } else if (error.code === "23505") {
      // unique violation -> already subscribed
      setStatus("already");
      setEmail("");
    } else {
      console.error("newsletter:", error.message);
      setStatus("error");
    }
  };

  const msg =
    status === "ok"
      ? n.success
      : status === "already"
      ? n.already
      : status === "invalid"
      ? n.invalid
      : status === "error"
      ? n.error
      : "";
  const msgClass = status === "ok" || status === "already" ? "ok" : status === "invalid" || status === "error" ? "err" : "";

  return (
    <section className="section-pad">
      <div className="container">
        <div className="newsletter reveal">
          <span className="eyebrow" style={{ color: "#bdeef6" }}>
            {n.eyebrow}
          </span>
          <h2 style={{ marginTop: 16 }}>{n.title}</h2>
          <p>{n.desc}</p>
          <form className="nl-form" onSubmit={submit} noValidate>
            <input
              type="email"
              placeholder={n.placeholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "sending") setStatus("idle");
              }}
              aria-label={n.placeholder}
              disabled={status === "sending"}
            />
            <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? n.sending : n.button}
            </button>
          </form>
          <p className={`nl-msg ${msgClass}`}>{msg}</p>
        </div>
      </div>
    </section>
  );
}
