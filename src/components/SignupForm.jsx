import { useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { supabase } from "../lib/supabase.js";

// Email capture form writing to public.newsletter_subscribers.
// `source` tags where the signup came from ("website" | "coming_soon").
export default function SignupForm({ source = "website" }) {
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
      .insert({ email: value, lang, source });
    if (!error) {
      setStatus("ok");
      setEmail("");
    } else if (error.code === "23505") {
      setStatus("already");
      setEmail("");
    } else {
      console.error("signup:", error.message);
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
  const msgClass =
    status === "ok" || status === "already"
      ? "ok"
      : status === "invalid" || status === "error"
      ? "err"
      : "";

  return (
    <>
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
    </>
  );
}
