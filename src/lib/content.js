import { useEffect, useState } from "react";
import { supabase } from "./supabase.js";

// content_items.type -> grouped key (mirrors the mobile app)
const TYPE_TO_KEY = {
  exhibition: "exhibitions",
  event: "events",
  workshop: "workshops",
  product: "products",
  audio: "audio",
};

const EMPTY = {
  exhibitions: [],
  events: [],
  workshops: [],
  products: [],
  audio: [],
  about: "",
};

// Each row's `data` jsonb is spread onto the item. Known fields include:
// title/name, img, desc, subkind, kind, cat, sub, status, tag, ticketUrl,
// price, sessions/time, spots, startDate/endDate/date, level, credits, chapters.
export async function fetchContent() {
  const grouped = { exhibitions: [], events: [], workshops: [], products: [], audio: [], about: "" };

  const { data: items, error } = await supabase
    .from("content_items")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) console.error("content_items:", error.message);

  (items || []).forEach((r) => {
    const key = TYPE_TO_KEY[r.type];
    if (key) grouped[key].push({ id: r.id, ...r.data });
  });

  const { data: st } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "about")
    .maybeSingle();
  grouped.about = st?.value || "";

  return grouped;
}

// Shared hook: fetch once, expose loading state.
export function useContent() {
  const [content, setContent] = useState(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchContent()
      .then((c) => active && setContent(c))
      .catch((e) => console.error(e))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { content, loading };
}

// Helpers to read fields that vary by content type.
export const itemTitle = (it) => it.title || it.name || "";
export const itemImage = (it) => it.img || it.image || "";
export const itemDesc = (it) => it.desc || it.description || "";

// Split exhibitions into the two brand pillars by their subkind/kind/cat.
export function splitExhibitions(exhibitions = []) {
  const isImmersive = (it) => {
    const v = `${it.subkind || ""} ${it.kind || ""} ${it.cat || ""} ${itemTitle(it)}`.toLowerCase();
    return v.includes("immersive") || v.includes("sürükleyici") || v.includes("pavilion") || v.includes("pavyon");
  };
  return {
    immersive: exhibitions.filter(isImmersive),
    digital: exhibitions.filter((it) => !isImmersive(it)),
  };
}
