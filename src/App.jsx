import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Exhibitions from "./pages/Exhibitions.jsx";
import Events from "./pages/Events.jsx";
import Workshops from "./pages/Workshops.jsx";
import Shop from "./pages/Shop.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
import { COMING_SOON, PREVIEW_KEY } from "./lib/config.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Full site is gated until launch. A ?preview=<key> visit unlocks it for this
// browser (remembered), so the team can preview while the public sees the
// "Çok Yakında" page.
const PREVIEW_FLAG = "hatch-preview";
function useUnlocked() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("preview") === PREVIEW_KEY) {
    try {
      localStorage.setItem(PREVIEW_FLAG, "1");
    } catch {
      /* ignore */
    }
  }
  try {
    return localStorage.getItem(PREVIEW_FLAG) === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const unlocked = useUnlocked();

  if (COMING_SOON && !unlocked) {
    return <ComingSoon />;
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sergiler" element={<Exhibitions />} />
          <Route path="/etkinlikler" element={<Events />} />
          <Route path="/atolyeler" element={<Workshops />} />
          <Route path="/magaza" element={<Shop />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
