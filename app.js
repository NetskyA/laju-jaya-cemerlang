(() => {
  "use strict";

  // =========================
  // AOS init
  // =========================
  if (window.AOS && typeof window.AOS.init === "function") {
    window.AOS.init({
      duration: 800,
      once: false,
    });
  }

  // =========================
  // Helpers
  // =========================
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // =========================
  // MOBILE MENU (hamburger)
  // =========================
  const menuBtn = qs("#menuBtn");
  const mobileMenu = qs("#mobileMenu");
  const iconHamburger = qs("#iconHamburger");
  const iconClose = qs("#iconClose");

  function setMobileMenu(open) {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", String(open));

    if (iconHamburger && iconClose) {
      iconHamburger.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    }
  }

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    const isOpen = !mobileMenu.classList.contains("hidden");
    setMobileMenu(!isOpen);
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", toggleMobileMenu);

    // Close mobile menu when click a link
    qsa("#mobileMenu a.nav-link").forEach((a) => {
      a.addEventListener("click", () => setMobileMenu(false));
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMobileMenu(false);
    });

    // Close if resize to md+
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMobileMenu(false);
    });
  }

  // =========================
  // NAV ACTIVE UNDERLINE (click + scrollspy) — FIXED
  // =========================
  const navLinks = qsa('a.nav-link[href^="#"]');

  // dedupe id (karena desktop+mobile nav duplicate)
  const ids = [];
  const seen = new Set();
  for (const a of navLinks) {
    const id = (a.getAttribute("href") || "").slice(1);
    if (!id) continue;
    if (seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }

  const sections = ids
    .map((id) => {
      try {
        return qs(`#${CSS.escape(id)}`);
      } catch {
        return qs(`#${id}`);
      }
    })
    .filter(Boolean);

  function setActiveNavById(id) {
    navLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      a.classList.toggle("is-active", href === `#${id}`);
    });
  }

  // Initial active
  const hashId = (location.hash || "").replace("#", "");
  const initialId =
    (hashId && sections.some((s) => s.id === hashId) ? hashId : "") ||
    (sections[0] ? sections[0].id : "");
  if (initialId) setActiveNavById(initialId);

  // On click: immediate highlight
  navLinks.forEach((a) => {
    a.addEventListener("click", () => {
      const id = (a.getAttribute("href") || "").slice(1);
      if (id) setActiveNavById(id);
    });
  });

  // Robust scrollspy (tanpa IntersectionObserver) → tidak bias ke section pendek
  const HEADER_OFFSET = 88;
  let ticking = false;

  function updateActiveByScroll() {
    if (!sections.length) return;

    let currentId = sections[0].id;

    // pilih section terakhir yang top-nya sudah lewat header
    for (const sec of sections) {
      const top = sec.getBoundingClientRect().top;
      if (top - HEADER_OFFSET <= 1) {
        currentId = sec.id;
      } else {
        break;
      }
    }

    if (currentId) setActiveNavById(currentId);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      updateActiveByScroll();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateActiveByScroll();

  // =========================
  // PRINCIPAL TABLE
  // =========================
const principals = [
  { no: 1, name: "ABADI NIAGA PRIMA", product: "JELLY WONGCOCO" },
  { no: 2, name: "ADI PRAKASA", product: "MAKANAN RINGAN “ARJUNA”" },
  { no: 3, name: "AKASHA WIRA INTERNATIONAL", product: "MAKANAN RINGAN “FLOATY, WONHAE”" },
  { no: 4, name: "ALADDIN SARANA INDONESIA", product: "SABUN MANDI “CITRA” & “DEA”" },
  { no: 5, name: "ALICE FOOD JAYA", product: "MAKANAN RINGAN “MOCHI NAGASAKI”" },
  { no: 6, name: "ALPHA MAKMUR MANDIRI", product: "MINUMAN “ZOLA ES SALJU”" },
  { no: 7, name: "AMAN INDAH MAKMUR", product: "POPOK BAYI “FLUFFY”, “MOMMY HAPPY” & POPOK DEWASA “IDEAL”" },
  { no: 8, name: "ANGGANA CATUR PRIMA", product: "PEWARNA MAKANAN “KOEPO”" },
  { no: 9, name: "AROMA PRIMA LIVINDO", product: "KOSMETIK “MORIS”" },
  { no: 10, name: "ASIA KAMOND FOOD", product: "MAKANAN RINGAN “SIDORE SLKYS, OJOY”" },
  { no: 11, name: "BEAUTY BATH CONCEPT INDONES.", product: "KOSMETIK “BLYSS”" },
  { no: 12, name: "BERKAH ROSITA MANDIRI", product: "PENGHARUM PAKAIAN “ROSITA”" },
  { no: 13, name: "BEVERA GREEN INDONESIA", product: "MAKANAN RINGAN “COCONA”" },
  { no: 14, name: "BOBY NUSANTARA", product: "MAKANAN RINGAN “KACANG”" },
  { no: 15, name: "BUDI DJAJA", product: "THE CELUP & KERING BANDULAN" },
  { no: 16, name: "CANADA GREEN GATE", product: "SABUN MANDI “CLINICO, SAFE WASH”" },
  { no: 17, name: "CARAWANG FOOD INDONESIA", product: "MAKANAN RINGAN “SHOW CAKE, MOCHI”" },
  { no: 18, name: "DAIDAN FOOD INDONESIA", product: "MAKANAN RINGAN “HANAKO”" },
  { no: 19, name: "DISTRIBUSI SUMBER SARI", product: "MAKANAN RINGAN “BOBOHO, FUWAWA”" },
  { no: 20, name: "DOMINO SUKSES BERSAMA", product: "KERTAS NASI “NYAMAN”" },
  { no: 21, name: "DRAGON PRIMA FARMA", product: "OBAT BEBAS “DRAGON”" },
  { no: 22, name: "DUA BERLIAN", product: "PENGHARUM RUANGAN “GLADE”" },
  { no: 23, name: "ENAK JAYA MAKMUR", product: "BUMBU MASAK “ENAK ECO”" },
  { no: 24, name: "ENSEVAL PUTERA MEG. TBK", product: "SUSU “DIABETASOL, ZEE”" },
  { no: 25, name: "FKS PANGAN NUSANTARA", product: "TEPUNG “BOLA DELI”" },
  { no: 26, name: "FUMAKILA NOMOS", product: "OBAT ANTI NYAMUK “NOMOS”" },
  { no: 27, name: "GLAXO SMITH KLINE", product: "SIKAT GIGI “SENSODYNE”" },
  { no: 28, name: "GUJATI 59 UTAMA", product: "OBAT JAMU “SIRANGN”" },
  { no: 29, name: "HAN'EI ABADI GRUP", product: "BUMBU PENYEDAP “OMBAK”" },
  { no: 30, name: "IEKIMTIE JAYA AGUNG", product: "PENYEDAP MAKANAN “CUKA”" },
  { no: 31, name: "IGLO INDONESIA", product: "BAHAN MAKANAN & BUMBU DAPUR “58”" },
  { no: 32, name: "INDONESIA UNIFY FOOD", product: "MAKANAN RINGAN “WILLONG”" },
  { no: 33, name: "INDONESIA UNITE FOOD", product: "ROTI “BY WAY”" },
  { no: 34, name: "INDRACO JAYA PERKASA", product: "MINUMAN “KOPI UANG MAS”" },
  { no: 35, name: "INTERNUSA FOOD", product: "SNACK “CUCU” & PERMEN “PARAGO”" },
  { no: 36, name: "JAYA ABADI", product: "MAKANAN RINGAN “REGAL”" },
  { no: 37, name: "JOHNSON N JOHNSON INDONESIA", product: "KOSMETIK “JOHNSON’S”" },
  { no: 38, name: "KIANTAKA RASA", product: "PENYEDAP MAKANAN “ANTAKA”" },
  { no: 39, name: "KITSURYO SEJAHTERA ABADI", product: "PERMEN MARSHMALLOW “SILKYS”" },
  { no: 40, name: "LAUTAN BOGA PRATAMA", product: "BUMBU TABUR “MAMAQU”" },
  { no: 41, name: "LUCK MILK INDONESIA", product: "MAKANAN RINGAN “YOGOOD SEAWEED”" },
  { no: 42, name: "LUCKY MOM INDONESIA", product: "POPOK BAYI “MAKUKU” & POPOK DEWASA “PARENTY”" },
  { no: 43, name: "MADUSARI NUSA PERDANA", product: "SOSIS “KIMBO, VIGO”" },
  { no: 44, name: "MAKMUR ARTHA CEMERLANG", product: "JELLY “DONALD”" },
  { no: 45, name: "MANTUB INDO BOGASARANA", product: "MAKANAN RINGAN “MIB GABIN”" },
  { no: 46, name: "MAZZONI JAVA UTAMA", product: "SAUS “MAYONAISE, SAMBAL”" },
  { no: 47, name: "MEGA LIGHTERINDO INTERNUSA", product: "KOREK API “M2000”" },
  { no: 48, name: "MILKO BAVERAGE INDUSTRY", product: "SUSU “MILKYMOO”" },
  { no: 49, name: "MIRASA FOOD INDUSTRY", product: "SNACK “PAYUNG”, “MR.PHO”, & “ARGO”" },
  { no: 50, name: "MONDE MAHKOTA BISKUIT", product: "NISSIN WAFER" },
  { no: 51, name: "MULTI INDOCITRA", product: "BOTOL SUSU “RUBBER NIPLE”" },
  { no: 52, name: "MUSTIKA DIGDAYA", product: "KECAP MANIS “KIPAS SATE”" },
  { no: 53, name: "PACIFIC ASIA JAYA", product: "KERUPUK JOGED" },
  { no: 54, name: "PRIORITAS JAYA INDONESIA", product: "FACE & BODY CARE “THAI”" },
  { no: 55, name: "PUSAN MANIS MULIA", product: "PERMEN “PUSAN”" },
  { no: 56, name: "RASA SEGAR SEJAHTERA", product: "DRINKIS “ASAM JAWA, JAS-T”" },
  { no: 57, name: "SATORIA AGRO INDUSTRI", product: "COOKIES “RICHWELL”" },
  { no: 58, name: "SEHAT SUKSES SEJAHTERA", product: "MINUMAN “GO SWEET”" },
  { no: 59, name: "SINAR ANTJOL", product: "SABUN CUCI “B-29, WOW”" },
  { no: 60, name: "SINAR MEADOW INT.", product: "MARGARINE “MOTHER CHOICE”" },
  { no: 61, name: "SMART", product: "MINYAK GORENG “FILMA, KITA, MENARA”" },
  { no: 62, name: "SRIBOGA FLOUR MILL", product: "TEPUNG “DOUBLE ZERO, TALI MAS, STUPA”" },
  { no: 63, name: "STANLI TRIJAYA MANDIRI", product: "ROTI “PADIMAS”" },
  { no: 64, name: "SUKANDA DJAYA", product: "MAKANAN RINGAN “KINDER JOY, NUTTELA”" },
  { no: 65, name: "SUMBER RASA", product: "MIE PIPIH “MIE CAP NONA”" },
  { no: 66, name: "SUNTA SURYA MAKMUR", product: "SUSU KENTAL MANIS “MILK BARN”" },
  { no: 67, name: "SURYA AGUNG ABADI", product: "BIHUN “BIHUN ATOM”" },
  { no: 68, name: "SURYAJAYA BUMI KENCANA", product: "BUMBU PENYEDAP “META KALDU”" },
  { no: 69, name: "TABURA GENTRI NUSANTARA", product: "BUMBU DAPUR “TABURA”" },
  { no: 70, name: "TARUNA KUSUMA PURI NUSA", product: "KAPAS “MODIS”" },
  { no: 71, name: "TJHINDATAMA MULIA", product: "KOSMETIK “MADAME GIE”" },
  { no: 72, name: "TRIJAYA TISSUE", product: "TISSUE “GREEN” & “LEGACY”" },
  { no: 73, name: "TROPIKA PERMATA INDAH", product: "SNACK “CIKCIK”" },
  { no: 74, name: "ULAM TIBA HALIM", product: "MINUMAN SERBUK “MARIMAS”" },
  { no: 75, name: "UNICHEM CANDI INDONESIA", product: "PENYEDAP “GARAM DAUN”" },
  { no: 76, name: "UNITAMA SARI MAS", product: "PENGHARUM RUANGAN “DAHLIA”" },
  { no: 77, name: "URC INDONESIA", product: "MAKANAN RINGAN “PIATOS”" },
  { no: 78, name: "USAHA PANGAN SEJAHTERA", product: "MIE SOHUN “BIRU SAK CAP” & MIE KERING CAP “89”" },
  { no: 79, name: "WAHANA KOSMETIKA INDONESIA", product: "KOSMETIK “AZARINE”" },
  { no: 80, name: "WIYO", product: "MAKANAN RINGAN “YOUKA, MODI”" }
];

  const tbody = qs("#principalRows");
  const search = qs("#search");
  const count = qs("#count");

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderPrincipal(items) {
    if (!tbody || !count) return;
    count.textContent = String(items.length);

    tbody.innerHTML = items
      .map(
        (x) => `
        <tr class="hover:bg-slate-50 cursor-pointer" data-name="${escapeHtml(x.name)}">
          <td class="px-4 py-3 text-slate-700">${x.no}</td>
          <td class="px-4 py-3 font-semibold text-slate-900">${escapeHtml(x.name)}</td>
          <td class="px-4 py-3 text-slate-700">${escapeHtml(x.product)}</td>
        </tr>
      `
      )
      .join("");
  }

  renderPrincipal(principals);

  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      if (!q) return renderPrincipal(principals);

      const filtered = principals.filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.product.toLowerCase().includes(q) ||
          String(x.no).includes(q)
      );
      renderPrincipal(filtered);
    });
  }

  if (tbody) {
    tbody.addEventListener("click", async (e) => {
      const tr = e.target.closest("tr");
      if (!tr) return;
      const name = tr.getAttribute("data-name") || "";

      try {
        await navigator.clipboard.writeText(name);
        tr.classList.add("bg-[#f3c24c]/20");
        setTimeout(() => tr.classList.remove("bg-[#f3c24c]/20"), 600);
      } catch (_) {}
    });
  }

  // =========================
  // MODAL MAP + AUTO ROUTE
  // =========================
  // const OFFICES = {
  //   pamekasan: {
  //     title: "CV. LAJU JAYA MAKMUR CEMERLANG - PAMEKASAN",
  //     address: "Dasok, Kec. Pademawu, Kabupaten Pamekasan, Jawa Timur 69323",
  //     mapsShare: "https://maps.app.goo.gl/1zHyptYRxyGXGJPaA",
  //   },
  //   bangkalan: {
  //     title: "CV. LAJU JAYA MAKMUR CEMERLANG - BANGKALAN",
  //     address:
  //       "WRHM+664, Buddan Laok, Buddan, Kec. Tanah Merah, Kabupaten Bangkalan, Jawa Timur 69172",
  //     mapsShare: "https://maps.app.goo.gl/Zhm6kbtSmrRFkmbJ7",
  //   },
  //   surabaya: {
  //     title: "CV. LAJU JAYA MAKMUR CEMERLANG - SURABAYA",
  //     address:
  //       "JMV3+JVQ, Jl. Raya Bambe No.156, Sarirejo, Bambe, Kec. Driyorejo, Kabupaten Gresik, Jawa Timur 61177",
  //     mapsShare: "https://maps.app.goo.gl/dRhH4kXCHrMd3PP6A",
  //   },
  // };

  const OFFICES = {
  pamekasan: {
    title: "CV. LAJU JAYA MAKMUR CEMERLANG - PAMEKASAN",
    address: "Dasok, Kec. Pademawu, Kabupaten Pamekasan, Jawa Timur 69323",
    lat: -7.160784038466984,
    lng: 113.51266594537786,
  },
  bangkalan: {
    title: "CV. LAJU JAYA MAKMUR CEMERLANG - BANGKALAN",
    address: "Buddan, Tanah Merah, Bangkalan, Jawa Timur 69172",
    lat: -7.071898413559718,
    lng: 112.83301168194899,
  },
  surabaya: {
    title: "CV. LAJU JAYA MAKMUR CEMERLANG - SURABAYA",
    address: "Jl. Raya Bambe No.156, Driyorejo, Gresik",
    lat: -7.3560970793017,
    lng: 112.65436503290792,
  },
};

  const mapModal = qs("#mapModal");
  const modalClose = qs("#modalClose");
  const modalTitle = qs("#modalTitle");
  const modalSubtitle = qs("#modalSubtitle");
  const modalAddress = qs("#modalAddress");
  const modalStatus = qs("#modalStatus");
  const modalMapFrame = qs("#modalMapFrame");
  const btnOpenMaps = qs("#btnOpenMaps");
  const btnFallbackRoute = qs("#btnFallbackRoute");

  let activeOfficeKey = null;

  function setStatus(msg) {
    if (modalStatus) modalStatus.textContent = msg;
  }

  function openDirectionsUrl(url) {
    const w = window.open(url, "_blank", "noopener,noreferrer");
    return !!w;
  }

  function attemptAutoRoute(office) {
    if (!office) return;

    if (!navigator.geolocation) {
      setStatus(
        "Browser kamu tidak mendukung Geolocation. Gunakan tombol “Rute dari lokasi saya” atau “Buka lokasi di Google Maps”."
      );
      return;
    }

    setStatus("Meminta izin lokasi...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const directionsUrl =
          "https://www.google.com/maps/dir/?api=1" +
          "&origin=" +
          encodeURIComponent(lat + "," + lng) +
          "&destination=" +
          encodeURIComponent(office.address) +
          "&travelmode=driving";

        const opened = openDirectionsUrl(directionsUrl);
        if (opened) {
          setStatus("Lokasi didapat. Rute Google Maps dibuka di tab baru.");
        } else {
          setStatus(
            "Lokasi didapat, tapi browser memblokir tab baru. Klik tombol “Rute dari lokasi saya” untuk membuka rute manual."
          );
        }
      },
      (err) => {
        let msg =
          "Gagal membaca lokasi. Gunakan tombol “Rute dari lokasi saya” atau “Buka lokasi di Google Maps”.";
        if (err && err.code === 1) msg = "Izin lokasi ditolak. " + msg;
        if (err && err.code === 2) msg = "Lokasi tidak tersedia. " + msg;
        if (err && err.code === 3) msg = "" + msg;

        setStatus(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  function openModal(officeKey) {
    const office = OFFICES[officeKey];
    if (!office || !mapModal) return;

    activeOfficeKey = officeKey;

    if (modalTitle) modalTitle.textContent = office.title;
    if (modalSubtitle) modalSubtitle.textContent = "Google Maps • Preview & Navigasi";
    if (modalAddress) modalAddress.textContent = office.address;

    if (modalMapFrame) {
      const embedUrl =
        "https://www.google.com/maps?q=" +
        encodeURIComponent(office.address) +
        "&output=embed";
      modalMapFrame.src = embedUrl;
    }

    if (btnOpenMaps) btnOpenMaps.href = office.mapsShare;

    if (btnFallbackRoute) {
      const fallback =
        "https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=" +
        encodeURIComponent(office.address) +
        "&travelmode=driving";
      btnFallbackRoute.href = fallback;
    }

    setStatus(
      "Sedang mencoba ambil lokasi untuk membuka rute otomatis. Jika gagal/ditolak, gunakan tombol “Rute (My Location)”."
    );

    mapModal.classList.remove("hidden");
    mapModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");

    attemptAutoRoute(office);
  }

  function closeModal() {
    if (!mapModal) return;

    mapModal.classList.add("hidden");
    mapModal.setAttribute("aria-hidden", "true");
    if (modalMapFrame) modalMapFrame.src = "about:blank";
    activeOfficeKey = null;
    document.body.classList.remove("overflow-hidden");
  }

  qsa(".js-office").forEach((el) => {
    el.addEventListener("click", () => openModal(el.dataset.office));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(el.dataset.office);
      }
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);

  if (mapModal) {
    mapModal.addEventListener("click", (e) => {
      const close = e.target.getAttribute("data-close");
      if (close === "overlay") closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mapModal && !mapModal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // =========================
  // BACK TO TOP
  // =========================
  const backToTop = qs("#backToTop");

  function toggleBackToTop() {
    if (!backToTop) return;
    const show = window.scrollY > 500;
    backToTop.classList.toggle("hidden", !show);
    backToTop.classList.toggle("flex", show);
  }

  if (backToTop) {
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
