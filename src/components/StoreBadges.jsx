import { APP_STORE, PLAY_STORE } from "../lib/config.js";
import { useLang } from "../i18n/LanguageContext.jsx";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.21-1.13 3.02-.78.92-2.05 1.62-3.27 1.52-.14-1.13.42-2.32 1.07-3.07.74-.85 2.06-1.5 3.33-1.47zM20.79 17.2c-.6 1.36-.89 1.96-1.66 3.16-1.07 1.68-2.58 3.77-4.45 3.79-1.66.02-2.08-1.08-4.33-1.06-2.25.01-2.72 1.08-4.38 1.06-1.87-.02-3.3-1.91-4.37-3.59C-1.4 16.79-1.71 9.7 1.43 6.5c1.06-1.08 2.46-1.69 3.93-1.69 1.51 0 2.46 1.07 3.71 1.07 1.21 0 1.95-1.07 3.7-1.07 1.31 0 2.69.71 3.68 1.94-3.23 1.77-2.71 6.38.34 7.45z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M3.6 1.3 13.5 11 3.6 20.7c-.36-.2-.6-.6-.6-1.06V2.36c0-.46.24-.86.6-1.06zM14.6 12.1l2.6 2.55-3.2 1.82L14.6 12.1zm0-2.2L14 5.63l3.2 1.82-2.6 2.45zM18.4 8.05l2.6 1.48c.66.38.66 1.6 0 1.98l-2.6 1.48L15.7 11l2.7-2.95z" />
    </svg>
  );
}

export default function StoreBadges() {
  const { t } = useLang();
  const pre = t.extras.audio.getOn;
  return (
    <div className="store-badges">
      <a className="store-badge" href={APP_STORE} target="_blank" rel="noreferrer" aria-label={`${pre} App Store`}>
        <AppleIcon />
        <span>
          <small>{pre}</small>
          <b>App Store</b>
        </span>
      </a>
      <a className="store-badge" href={PLAY_STORE} target="_blank" rel="noreferrer" aria-label={`${pre} Google Play`}>
        <PlayIcon />
        <span>
          <small>{pre}</small>
          <b>Google Play</b>
        </span>
      </a>
    </div>
  );
}
