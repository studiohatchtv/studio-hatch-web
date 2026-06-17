// Default external ticketing URL. Per-item `ticketUrl` (from Supabase) overrides
// this when present. TODO: replace with the real ticketing provider link.
export const TICKET_URL = "https://www.passo.com.tr/";

export const SOCIAL = {
  instagram: "https://instagram.com/studiohatch",
  email: "info@studiohatch.tv",
};

// Audio guide mobile app store links. TODO: replace with the real listings.
export const APP_STORE = "https://apps.apple.com/app/idXXXXXXXXXX";
export const PLAY_STORE = "https://play.google.com/store/apps/details?id=tv.studiohatch.app";

// --- Coming soon / launch gate ---
// While true, every route shows the "Çok Yakında" page. The full site stays
// built and reachable only via the secret preview link (see PREVIEW_KEY).
// Flip to false on launch day to open the whole site.
export const COMING_SOON = true;

// Visit https://studiohatchtv.github.io/studio-hatch-web/?preview=hatch2026 once
// to unlock the full site in your browser (remembered in localStorage).
export const PREVIEW_KEY = "hatch2026";
