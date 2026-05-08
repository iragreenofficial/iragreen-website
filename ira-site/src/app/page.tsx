"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaTiktok,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import { HiMenu, HiX, HiMail } from "react-icons/hi";
import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 120, filter: "blur(12px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1 },
  viewport: { once: true },
};

type LiveEvent = {
  title: string;
  location: string;
  description: string;
  date: string;
};

type Product = {
  id: string;
  title: string;
  year?: string;
  desc: string;
  image: string;
  status: string;
  fit: string;
  details: string;
  price: number;
  hasSize?: boolean;
};

type CartItem = Product & {
  quantity: number;
  size?: string;
};

const shippingRates = {
  italy: { price: 7 },
  eu: { price: 25 },
  world: { price: 70 },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "it">("it");
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [shippingZone, setShippingZone] =
    useState<keyof typeof shippingRates>("italy");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const t = {
    en: {
      navMusic: "Music",
      navConcerts: "Concerts",
      navShop: "Shop",
      navBio: "Bio",
      navBooking: "Booking",

      cart: "Cart",
      openCart: "Open Cart",
      remove: "Remove",
      close: "Close",
      price: "Price",
      size: "Size",
      quantity: "Quantity",
      itemTotal: "Item total",
      addToCart: "Add to Cart",
      emptyCart: "Your cart is empty.",
      shipping: "Shipping",
      subtotal: "Subtotal",
      total: "Total",
      payPaypal: "Pay with PayPal",
      cartNote:
        "One shipping cost is applied to the whole cart. Final delivery details are completed during PayPal checkout.",
      shippingItaly: "Italy",
      shippingEu: "European Union",
      shippingWorld: "Rest of the world",

      heroEyebrow: "Official Website",
      heroClaim: "Rock voice. No filters. No apologies.",
      heroListen: "Listen",
      heroBooking: "Booking",

      bioEyebrow: "Biography",
      bioTitle1: "Built for the stage.",
      bioTitle2: "Born to disturb.",
      bioText1:
        "Ira Green is an Italian rock and metal voice shaped by instinct, attitude and a stage presence that does not ask for permission.",
      bioText2:
        "Known to the wider public after her explosive appearance on The Voice of Italy, Ira turned that spotlight into a darker, louder and more personal artistic path.",
      bioText3:
        "Her world moves between heavy guitars, cinematic visuals and a vocal identity built to hit hard: no filters, no apologies, no decorative rockstar cosplay.",
      bioCard1: "Albums",
      bioCard2: "Voice",
      bioCard3: "Mood",
      bioValue1: "3 Albums",
      bioValue2: "Rock / Metal",
      bioValue3: "No Apologies",
      bioImageTag: "Voice / Fire / Impact",

      liveEyebrow: "Concert Dates",
      liveTitle: "Upcoming Concerts",
      liveEmpty: "No upcoming shows announced.",
      liveInfo: "Info",
      showAllEvents: "Show All Events",
      showLessEvents: "Show Less",

      musicEyebrow: "Discography",
      musicTitle: "Music",
      musicIntro: "Three records. One voice. Zero intention of behaving.",
      openSpotify: "Open Spotify",
      listen: "Listen",
      albumColoriText:
        "A louder, more personal chapter. Color, rage and identity in full volume.",
      album7Text: "Heavy attitude, sharp vocals and a darker rock instinct.",
      albumRebeligionText:
        "Rebellion, faith, distortion and the refusal to stay quiet.",

      shopEyebrow: "Official Merch",
      shopTitle: "Shop",
      shopIntro:
        "Official merch, records and physical releases from the Ira Green universe. Black, green, noise. Everything else is decoration.",
      shopClaim: "Wear the noise. Burn the silence.",
      view: "View",

      tshirtDesc: "Ira Green official tee",
      tshirtDetails:
        "Official Ira Green merchandise. Black attitude, green identity, built for people who do not need permission to make noise.",
      album7Details:
        "Physical release from Ira Green discography. A dark, heavy and direct chapter of her rock and metal path.",
      rebeligionDetails:
        "Rebellion, distortion and identity. A record for those who prefer volume over decoration.",
      coloriDetails:
        "A louder and more personal chapter: color, rage, voice and attitude in full volume.",

      bookingEyebrow: "Booking & Contact",
      bookingTitle: "Let's make noise.",
      bookingEmail: "Book via Email",
      bookingWhatsapp: "WhatsApp",

      footerClaim: "Rock voice. Metal attitude. No apologies.",
      rights: "All rights reserved.",

      footerPrivacy: "Privacy",
      footerCookie: "Cookie",
      footerTerms: "Terms",
    },
    it: {
      navMusic: "Musica",
      navConcerts: "Concerti",
      navShop: "Shop",
      navBio: "Bio",
      navBooking: "Contatti",

      cart: "Carrello",
      openCart: "Apri Carrello",
      remove: "Rimuovi",
      close: "Chiudi",
      price: "Prezzo",
      size: "Taglia",
      quantity: "Quantità",
      itemTotal: "Totale articolo",
      addToCart: "Aggiungi al Carrello",
      emptyCart: "Il carrello è vuoto.",
      shipping: "Spedizione",
      subtotal: "Subtotale",
      total: "Totale",
      payPaypal: "Paga con PayPal",
      cartNote:
        "Viene applicato un solo costo di spedizione per tutto il carrello. I dettagli finali di consegna saranno completati durante il checkout PayPal.",
      shippingItaly: "Italia",
      shippingEu: "Unione Europea",
      shippingWorld: "Resto del mondo",

      heroEyebrow: "Sito Ufficiale",
      heroClaim: "Voce rock. Nessun filtro. Nessuna scusa.",
      heroListen: "Ascolta",
      heroBooking: "Info Concerti",

      bioEyebrow: "Biografia",
      bioTitle1: "Nata per il palco.",
      bioTitle2: "Creata per disturbare.",
      bioText1:
        "Ira Green è una voce rock e metal italiana costruita su istinto, attitudine e una presenza scenica che non chiede permesso.",
      bioText2:
        "Conosciuta dal grande pubblico dopo la sua apparizione esplosiva a The Voice of Italy, Ira ha trasformato quella visibilità in un percorso artistico più oscuro, potente e personale.",
      bioText3:
        "Il suo mondo vive tra chitarre pesanti, visual cinematografici e un’identità vocale costruita per colpire duro: niente filtri, niente scuse, niente rockstar di plastica.",
      bioCard1: "Album",
      bioCard2: "Voce",
      bioCard3: "Mood",
      bioValue1: "3 Dischi",
      bioValue2: "Rock / Metal",
      bioValue3: "Nessuna Scusa",
      bioImageTag: "Voce / Fuoco / Impatto",

      liveEyebrow: "Date Concerti",
      liveTitle: "Prossimi Concerti",
      liveEmpty: "Nessun concerto annunciato al momento.",
      liveInfo: "Info",
      showAllEvents: "Mostra Tutti gli Eventi",
      showLessEvents: "Mostra Meno",

      musicEyebrow: "Discografia",
      musicTitle: "Musica",
      musicIntro: "Tre dischi. Una voce. E nessuna intenzione di abbassare il volume.",
      openSpotify: "Apri Spotify",
      listen: "Ascolta",
      albumColoriText:
        "Un capitolo più forte, personale e diretto. Colore, rabbia e identità a tutto volume.",
      album7Text:
        "Attitudine pesante, voce tagliente e un istinto rock ancora più oscuro.",
      albumRebeligionText:
        "Ribellione, fede, distorsione e il rifiuto totale di stare zitti.",

      shopEyebrow: "Merch Ufficiale",
      shopTitle: "Shop",
      shopIntro:
        "Merch ufficiale, dischi e nuove uscite dall’universo Ira Green. Nero, verde, rumore. Il resto è decorazione.",
      shopClaim: "Indossa il rumore. Brucia il silenzio.",
      view: "Supporta ora",

      tshirtDesc: "T-shirt ufficiale Ira Green",
      tshirtDetails:
        "Merchandise ufficiale Ira Green. Attitudine nera, identità verde, pensata per chi non ha bisogno del permesso per fare rumore.",
      album7Details:
        "Uscita fisica dalla discografia di Ira Green. Un capitolo oscuro, pesante e diretto del suo percorso rock e metal.",
      rebeligionDetails:
        "Ribellione, distorsione e identità. Un disco per chi preferisce il volume alla decorazione.",
      coloriDetails:
        "Un capitolo più forte e personale: colore, rabbia, voce e attitudine a tutto volume.",

      bookingEyebrow: "Contatti & Info Concerti",
      bookingTitle: "Facciamo un po’ di rock!",
      bookingEmail: "Scrivi via Email",
      bookingWhatsapp: "WhatsApp",

      footerClaim: "Voce rock. Attitudine metal. Nessuna scusa.",
      rights: "Tutti i diritti riservati.",

      footerPrivacy: "Privacy",
      footerCookie: "Cookie",
      footerTerms: "Condizioni",
    },
  }[language];

  const products: Product[] = useMemo(
    () => [
      {
        id: "tshirt",
        title: "T-Shirt",
        desc: t.tshirtDesc,
        image: "/shop-shirt.jpg",
        status: "Merch",
        fit: "object-top",
        price: 18,
        hasSize: true,
        details: t.tshirtDetails,
      },
      {
        id: "7",
        title: "7",
        year: "2019",
        desc: "2019",
        image: "/shop-7.jpg",
        status: language === "en" ? "Music" : "Musica",
        fit: "object-center",
        price: 12,
        details: t.album7Details,
      },
      {
        id: "rebeligion",
        title: "RE(be)LIGION",
        year: "2016",
        desc: "2016",
        image: "/shop-rebeligion.jpg",
        status: language === "en" ? "Music" : "Musica",
        fit: "object-center",
        price: 12,
        details: t.rebeligionDetails,
      },
      {
        id: "colori",
        title: "Tutti i Colori dell’Ira",
        desc: "Album",
        image: "/shop-colori.jpg",
        status: language === "en" ? "Music" : "Musica",
        fit: "object-center",
        price: 15,
        details: t.coloriDetails,
      },
    ],
    [language, t]
  );

  const selectedShipping = shippingRates[shippingZone];

  const cartSubtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const cartTotal = cart.length > 0 ? cartSubtotal + selectedShipping.price : 0;

  const cartDescription = cart
    .map((item) =>
      item.hasSize
        ? `${item.title} - Size ${item.size} x${item.quantity}`
        : `${item.title} x${item.quantity}`
    )
    .join(" | ");

  const paypalUrl =
    cart.length > 0
      ? `https://www.paypal.com/cgi-bin/webscr?${new URLSearchParams({
          cmd: "_xclick",
          business: "iragreenonline@gmail.com",
          item_name: `Ira Green Shop - ${cartDescription}`,
          amount: cartSubtotal.toFixed(2),
          currency_code: "EUR",
          shipping: selectedShipping.price.toFixed(2),
          no_shipping: "0",
          no_note: "0",
        }).toString()}`
      : "#";

  useEffect(() => {
    fetch("/api/live")
      .then((res) => res.json())
      .then((data) => setLiveEvents(data))
      .catch(() => setLiveEvents([]));
  }, []);

  useEffect(() => {
  const accepted = localStorage.getItem("ira-cookie-consent");

  if (accepted === "true") {
    setCookieAccepted(true);
  }
}, []);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const addToCart = (product: Product) => {
    const size = product.hasSize ? selectedSize : undefined;

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: selectedQuantity,
          size,
        },
      ];
    });

    setSelectedProduct(null);
    setSelectedQuantity(1);
    setSelectedSize("M");
    setCartOpen(true);
  };

  const updateCartQuantity = (
    id: string,
    size: string | undefined,
    quantity: number
  ) => {
    if (quantity <= 0) {
      setCart((currentCart) =>
        currentCart.filter((item) => !(item.id === id && item.size === size))
      );
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const acceptCookies = () => {
  localStorage.setItem("ira-cookie-consent", "true");
  setCookieAccepted(true);
};
  const removeFromCart = (id: string, size?: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => !(item.id === id && item.size === size))
    );
  };

  return (
    <>
      <div id="top" />

      <main className="relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-green-400 selection:text-black">
        <div
          className="pointer-events-none fixed inset-0 z-[1] transition duration-300"
          style={{
            background: `radial-gradient(
              700px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(34,197,94,0.12),
              transparent 42%
            )`,
          }}
        />

        <div className="pointer-events-none fixed inset-0 z-[2] opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:90px_90px]" />

        <div className="pointer-events-none fixed inset-0 z-[3] bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.10),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.04),transparent_35%)]" />

        <section className="relative z-10 h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 z-0 h-full w-full object-cover opacity-70"
            style={{ objectPosition: "50% 35%" }}
          >
            <source src="/Ira-Hero-prova.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/20 to-black" />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_0%,black_92%)]" />
          <div className="absolute inset-0 z-[3] bg-[linear-gradient(115deg,rgba(34,197,94,0.08),transparent_28%,transparent_70%,rgba(255,255,255,0.03))]" />

          <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-3 shadow-2xl shadow-black/60 backdrop-blur-2xl">
              <a href="#top" className="group flex items-center">
                <Image
                  src="/ira-logo.png"
                  alt="Ira Green"
                  width={180}
                  height={60}
                  priority
                  className="h-auto w-[140px] transition duration-500 group-hover:scale-105"
                />
              </a>

              <nav className="hidden items-center gap-8 md:flex">
                {[
                  [t.navMusic, "#music"],
                  [t.navConcerts, "#live"],
                  [t.navShop, "#shop"],
                  [t.navBio, "#bio"],
                  [t.navBooking, "#booking"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="relative text-[11px] font-bold uppercase tracking-[0.28em] text-white/55 transition hover:text-green-400"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <div className="hidden items-center gap-4 md:flex">
                <a
                  href="https://www.instagram.com/iragreenofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/45 transition hover:text-green-400"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://open.spotify.com/artist/58eTshTblzJjY7vJ2KVzhq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/45 transition hover:text-green-400"
                >
                  <FaSpotify />
                </a>
                <a
                  href="https://www.youtube.com/c/iragreenofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/45 transition hover:text-green-400"
                >
                  <FaYoutube />
                </a>

                <div className="ml-2 flex overflow-hidden rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.18em]">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-2 transition ${
                      language === "en"
                        ? "bg-green-400 text-black"
                        : "text-white/45 hover:text-green-400"
                    }`}
                  >
                    EN
                  </button>

                  <button
                    onClick={() => setLanguage("it")}
                    className={`px-3 py-2 transition ${
                      language === "it"
                        ? "bg-green-400 text-black"
                        : "text-white/45 hover:text-green-400"
                    }`}
                  >
                    IT
                  </button>
                </div>

                <button
                  onClick={() => setCartOpen(true)}
                  className="relative ml-2 rounded-full border border-green-400/30 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-green-400 transition hover:bg-green-400 hover:text-black"
                >
                  {t.cart}
                  {cart.length > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-400 text-[10px] text-black">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
                aria-label="Open menu"
              >
                <HiMenu size={22} />
              </button>
            </div>

            {menuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex flex-col bg-black/95 px-8 py-8 backdrop-blur-2xl md:hidden"
              >
                <div className="mb-16 flex items-center justify-between">
                  <Image
                    src="/ira-logo.png"
                    alt="Ira Green"
                    width={56}
                    height={56}
                    className="h-12 w-auto"
                  />

                  <button
                    onClick={() => setMenuOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
                    aria-label="Close menu"
                  >
                    <HiX size={24} />
                  </button>
                </div>

                <nav className="flex flex-1 flex-col justify-center gap-8">
                  {[
                    [t.navMusic, "#music"],
                    [t.navConcerts, "#live"],
                    [t.navShop, "#shop"],
                    [t.navBio, "#bio"],
                    [t.navBooking, "#booking"],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="text-5xl font-black uppercase tracking-tight text-white transition hover:text-green-400"
                    >
                      {label}
                    </a>
                  ))}

                  <div className="flex w-fit overflow-hidden rounded-full border border-white/10 bg-white/5 text-xs font-black uppercase tracking-[0.2em]">
                    <button
                      onClick={() => setLanguage("en")}
                      className={`px-5 py-3 transition ${
                        language === "en"
                          ? "bg-green-400 text-black"
                          : "text-white/50"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLanguage("it")}
                      className={`px-5 py-3 transition ${
                        language === "it"
                          ? "bg-green-400 text-black"
                          : "text-white/50"
                      }`}
                    >
                      IT
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setCartOpen(true);
                    }}
                    className="mt-4 w-fit border border-green-400/40 px-6 py-4 text-left text-xl font-black uppercase tracking-[0.25em] text-green-400"
                  >
                    {t.cart} (
                    {cart.reduce((total, item) => total + item.quantity, 0)})
                  </button>
                </nav>

                <div className="flex gap-6 text-2xl text-white/60">
                  <a
                    href="https://www.instagram.com/iragreenofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://open.spotify.com/artist/58eTshTblzJjY7vJ2KVzhq"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSpotify />
                  </a>
                  <a
                    href="https://www.youtube.com/c/iragreenofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="https://www.tiktok.com/@ira_green_official"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTiktok />
                  </a>
                  <a
                    href="https://www.facebook.com/iragreenofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                  </a>
                </div>
              </motion.div>
            )}
          </header>

          <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-5 text-lg md:flex">
            <a
              href="https://www.instagram.com/iragreenofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 transition hover:scale-110 hover:text-green-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://open.spotify.com/artist/58eTshTblzJjY7vJ2KVzhq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 transition hover:scale-110 hover:text-green-400"
            >
              <FaSpotify />
            </a>
            <a
              href="https://www.youtube.com/c/iragreenofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 transition hover:scale-110 hover:text-green-400"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.tiktok.com/@ira_green_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 transition hover:scale-110 hover:text-green-400"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.facebook.com/iragreenofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 transition hover:scale-110 hover:text-green-400"
            >
              <FaFacebookF />
            </a>
          </div>

          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
            <motion.div {...reveal}>
              <p className="mb-5 text-xs uppercase tracking-[0.45em] text-zinc-400">
                {t.heroEyebrow}
              </p>

              <div className="mx-auto mt-4 flex justify-center">
                <Image
                  src="/ira-logo.png"
                  alt="Ira Green"
                  width={640}
                  height={180}
                  priority
                  className="h-auto w-[280px] drop-shadow-[0_0_45px_rgba(34,197,94,0.18)] md:w-[520px]"
                />
              </div>

              <p className="mt-6 text-xl text-zinc-300 md:text-2xl">
                {t.heroClaim}
              </p>

              <div className="mt-10 flex justify-center gap-4">
                <a
                  href="#music"
                  className="bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-green-400"
                >
                  {t.heroListen}
                </a>

                <a
                  href="#booking"
                  className="border border-white/40 bg-black/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] backdrop-blur transition hover:border-green-400 hover:bg-green-400 hover:text-black"
                >
                  {t.heroBooking}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="bio"
          className="relative z-10 overflow-hidden border-t border-white/10 bg-black px-6 py-32 md:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.16),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

          <motion.div
            {...reveal}
            className="relative mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-green-500/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/70">
                <Image
                  src="/bio-irav2.jpg"
                  alt="Ira Green"
                  width={900}
                  height={1200}
                  className="h-[620px] w-full object-cover grayscale contrast-125 transition duration-700 hover:scale-105 hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-green-400">
                    {t.bioImageTag}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.45em] text-zinc-500">
                {t.bioEyebrow}
              </p>

              <h2 className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
                {t.bioTitle1}
                <span className="block text-green-400">{t.bioTitle2}</span>
              </h2>

              <div className="mt-10 space-y-6 text-lg leading-relaxed text-zinc-300">
                <p>{t.bioText1}</p>
                <p className="text-zinc-400">{t.bioText2}</p>
                <p className="text-zinc-500">{t.bioText3}</p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  [t.bioCard1, t.bioValue1],
                  [t.bioCard2, t.bioValue2],
                  [t.bioCard3, t.bioValue3],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:border-green-400/40 hover:bg-green-400/[0.04]"
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                      {label}
                    </p>
                    {label === t.bioCard1 ? (
                        <a
                            href="#music"
                                className="mt-3 inline-block text-xl font-black uppercase text-white transition hover:text-green-400"
                                  >
                                        {value}
                                          </a>
                                          ) : (
  <p className="mt-3 text-xl font-black uppercase text-white">
    {value}
  </p>
)}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="live"
          className="relative z-10 border-t border-white/10 bg-zinc-950 px-6 py-28 md:px-16"
        >
          <motion.div {...reveal} className="mx-auto max-w-6xl">
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-zinc-500">
              {t.liveEyebrow}
            </p>

            <h2 className="mb-12 text-4xl font-black uppercase tracking-tight md:text-6xl">
              {t.liveTitle}
            </h2>

            <div className="space-y-4">
              {liveEvents.length > 0 ? (
                (showAllEvents ? liveEvents : liveEvents.slice(0, 3)).map((event) => {
                  const formattedDate = event.date
                    ? new Date(
                        event.date.replace(
                          /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/,
                          "$1-$2-$3T$4:$5:$6Z"
                        )
                      ).toLocaleDateString(
                        language === "it" ? "it-IT" : "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "TBA";

                  return (
                    <div
                      key={`${event.title}-${event.date}`}
                      className="group relative overflow-hidden border border-white/10 bg-black/40 p-6 transition hover:border-green-500/60 hover:bg-black/70"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-green-500 opacity-60 transition group-hover:opacity-100" />

                      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <div>
                          <p className="text-xs uppercase tracking-[0.35em] text-green-500">
                            {formattedDate}
                          </p>

                          <h3 className="mt-3 text-2xl font-black uppercase tracking-[0.08em]">
                            {event.title}
                          </h3>

                          {event.location && (
                            <p className="mt-3 max-w-2xl text-sm text-zinc-500">
                              {event.location}
                            </p>
                          )}
                        </div>

                        {event.description ? (
                          event.description.match(/https?:\/\/[^\s]+/) ? (
                            <a
                              href={
                                event.description.match(/https?:\/\/[^\s]+/)?.[0]
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-fit border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] transition hover:border-green-400 hover:bg-green-400 hover:text-black"
                            >
                              {t.liveInfo}
                            </a>
                          ) : (
                            <details className="w-fit">
                              <summary className="cursor-pointer list-none border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] transition hover:border-green-400 hover:bg-green-400 hover:text-black">
                                {t.liveInfo}
                              </summary>

                              <p className="mt-4 max-w-xs text-sm normal-case tracking-normal text-zinc-400">
                                {event.description}
                              </p>
                            </details>
                          )
                        ) : (
                          <button
                            disabled
                            className="w-fit cursor-not-allowed border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-700"
                          >
                            {t.liveInfo}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="border border-white/10 bg-black/40 p-8 text-zinc-500">
                  {t.liveEmpty}
                </div>
              )}
            </div>
            {liveEvents.length > 4 && (
  <div className="mt-10 flex justify-center">
    <button
      onClick={() => setShowAllEvents(!showAllEvents)}
      className="group border border-green-400/30 bg-black/30 px-8 py-4 text-xs font-black uppercase tracking-[0.28em] text-green-400 transition hover:border-green-400 hover:bg-green-400 hover:text-black"
    >
      {showAllEvents
        ? t.showLessEvents
        : t.showAllEvents}

      <span className="ml-3 inline-block transition group-hover:translate-x-1">
        →
      </span>
    </button>
  </div>
)}
          </motion.div>
        </section>

        <section
          id="music"
          className="relative z-10 overflow-hidden border-t border-white/10 bg-black px-6 py-32 text-white md:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,94,0.16),transparent_35%),linear-gradient(to_bottom,#000,rgba(0,0,0,0.65),#000)]" />

          <motion.div {...reveal} className="relative mx-auto max-w-7xl">
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-zinc-500">
              {t.musicEyebrow}
            </p>

            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-5xl font-black uppercase tracking-tight md:text-7xl">
                  {t.musicTitle}
                </h2>

                <p className="mt-6 max-w-2xl text-zinc-400">
                  {t.musicIntro}
                </p>
              </div>

              <a
                href="https://open.spotify.com/artist/58eTshTblzJjY7vJ2KVzhq"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit border border-green-400/40 px-6 py-4 text-xs font-black uppercase tracking-[0.25em] text-green-400 transition hover:bg-green-400 hover:text-black"
              >
                {t.openSpotify}
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Tutti i Colori dell’Ira",
                  year: "2023",
                  image: "/shop-colori.jpg",
                  link: "https://open.spotify.com/intl-it/album/4K7Us3LGIygkF6KuSyTYIt",
                  text: t.albumColoriText,
                },
                {
                  title: "7",
                  year: "2019",
                  image: "/shop-7.jpg",
                  link: "https://open.spotify.com/intl-it/album/2afRtgwHuHsWvN9vWnOCCF",
                  text: t.album7Text,
                },
                {
                  title: "RE(be)LIGION",
                  year: "2016",
                  image: "/shop-rebeligion.jpg",
                  link: "https://open.spotify.com/intl-it/album/6PSgg2oOzTxr5V5CtkDg0D",
                  text: t.albumRebeligionText,
                },
              ].map((album) => (
                <motion.article
                  key={album.title}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/70"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={album.image}
                      alt={album.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.25),transparent_55%)]" />

                    <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/70 backdrop-blur">
                      {album.year}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-3xl font-black uppercase leading-none tracking-tight">
                      {album.title}
                    </h3>

                    <p className="mt-5 min-h-[72px] text-sm leading-relaxed text-zinc-500">
                      {album.text}
                    </p>

                    <a
                      href={album.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-3 border border-white/25 bg-black/35 px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-white backdrop-blur transition hover:border-green-400 hover:bg-green-400 hover:text-black"
                    >
                      {t.listen}
                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-16 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/70 p-3 shadow-2xl shadow-black/70">
              <iframe
                data-testid="embed-iframe"
                className="rounded-[1.5rem]"
                src="https://open.spotify.com/embed/track/4y2lhBrPGcSxdzUHRuQaCC?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </motion.div>
        </section>

        <section
          id="shop"
          className="relative z-10 overflow-hidden bg-black px-6 py-32 md:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.20),transparent_32%),linear-gradient(to_bottom,rgba(0,0,0,0),#000_75%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

          <motion.div {...reveal} className="relative mx-auto max-w-7xl">
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-zinc-500">
              {t.shopEyebrow}
            </p>

            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-5xl font-black uppercase tracking-tight md:text-7xl">
                  {t.shopTitle}
                </h2>

                <p className="mt-6 max-w-2xl text-zinc-400">
                  {t.shopIntro}
                </p>
              </div>

              <div className="flex flex-col gap-4 md:items-end">
                <p className="max-w-xs text-xs uppercase tracking-[0.25em] text-zinc-600">
                  {t.shopClaim}
                </p>

                <button
                  onClick={() => setCartOpen(true)}
                  className="w-fit border border-green-400/40 px-6 py-4 text-xs font-black uppercase tracking-[0.25em] text-green-400 transition hover:bg-green-400 hover:text-black"
                >
                  {t.openCart} (
                  {cart.reduce((total, item) => total + item.quantity, 0)})
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {products.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/70"
                >
                  <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.38),transparent_48%)]" />
                  <div className="pointer-events-none absolute -inset-1 z-0 rounded-[2rem] opacity-0 blur-2xl transition duration-700 group-hover:opacity-100 bg-green-500/25" />

                  <div className="relative h-[460px] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={`${item.fit} object-cover transition duration-700 group-hover:scale-110`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

                    <div className="absolute left-5 top-5 rounded-full border border-green-400/30 bg-black/45 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-green-400 backdrop-blur-md">
                      {item.status}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-green-400">
                        {item.desc}
                      </p>

                      <h3 className="text-3xl font-black uppercase leading-none tracking-tight">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-xl font-black text-white">
                        €{item.price.toFixed(2)}
                      </p>

                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setSelectedQuantity(1);
                          setSelectedSize("M");
                        }}
                        className="mt-7 inline-flex items-center gap-3 border border-white/25 bg-black/35 px-5 py-3 text-xs font-black uppercase tracking-[0.25em] text-white backdrop-blur transition hover:border-green-400 hover:bg-green-400 hover:text-black"
                      >
                        {t.view}
                        <span className="transition group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-6 backdrop-blur-2xl">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 cursor-default"
              aria-label="Close product modal"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/80 md:grid-cols-2"
            >
              <div className="relative h-[420px] md:h-full">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className={`${selectedProduct.fit} object-cover`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              <div className="relative p-8 md:p-10">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-green-400 hover:text-green-400"
                  aria-label="Close"
                >
                  <HiX size={22} />
                </button>

                <p className="mb-5 w-fit rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-green-400">
                  {selectedProduct.status}
                </p>

                <h3 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                  {selectedProduct.title}
                </h3>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">
                  {selectedProduct.desc}
                </p>

                <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-400">
                  {selectedProduct.details}
                </p>

                <div className="mt-8 border border-white/10 bg-black/35 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                      {t.price}
                    </span>

                    <span className="text-3xl font-black text-white">
                      €{selectedProduct.price.toFixed(2)}
                    </span>
                  </div>

                  {selectedProduct.hasSize && (
                    <div className="mt-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                        {t.size}
                      </label>

                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="mt-3 w-full border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-green-400"
                      >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                        <option value="XXXL">XXXL</option>
                      </select>
                    </div>
                  )}

                  <div className="mt-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                      {t.quantity}
                    </label>

                    <div className="mt-3 flex w-fit items-center border border-white/10 bg-black">
                      <button
                        onClick={() =>
                          setSelectedQuantity((quantity) =>
                            Math.max(1, quantity - 1)
                          )
                        }
                        className="px-4 py-3 text-lg text-white transition hover:bg-white hover:text-black"
                      >
                        −
                      </button>

                      <span className="min-w-12 px-4 text-center font-black">
                        {selectedQuantity}
                      </span>

                      <button
                        onClick={() =>
                          setSelectedQuantity((quantity) => quantity + 1)
                        }
                        className="px-4 py-3 text-lg text-white transition hover:bg-white hover:text-black"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
                      {t.itemTotal}
                    </span>

                    <span className="text-2xl font-black text-green-400">
                      €{(selectedProduct.price * selectedQuantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="bg-green-400 px-7 py-4 text-center text-xs font-black uppercase tracking-[0.25em] text-black transition hover:bg-white"
                  >
                    {t.addToCart}
                  </button>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="border border-white/20 px-7 py-4 text-xs font-black uppercase tracking-[0.25em] text-white transition hover:border-white hover:bg-white hover:text-black"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {cartOpen && (
          <div className="fixed inset-0 z-[110] flex justify-end bg-black/80 backdrop-blur-2xl">
            <button
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 cursor-default"
              aria-label="Close cart"
            />

            <motion.aside
              initial={{ x: 420, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-white/10 bg-zinc-950 shadow-2xl shadow-black"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">
                    Ira Green Shop
                  </p>
                  <h3 className="mt-2 text-3xl font-black uppercase">
                    {t.cart}
                  </h3>
                </div>

                <button
                  onClick={() => setCartOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-green-400 hover:text-green-400"
                >
                  <HiX size={22} />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <p className="text-zinc-500">{t.emptyCart}</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.id}-${item.size || "nosize"}`}
                      className="grid grid-cols-[86px_1fr] gap-4 border border-white/10 bg-black/35 p-3"
                    >
                      <div className="relative h-24 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className={`${item.fit} object-cover`}
                        />
                      </div>

                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-black uppercase leading-tight">
                              {item.title}
                            </h4>

                            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-zinc-500">
                              €{item.price.toFixed(2)}
                              {item.size ? ` / ${t.size} ${item.size}` : ""}
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600 transition hover:text-red-400"
                          >
                            {t.remove}
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-white/10">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="px-3 py-2 transition hover:bg-white hover:text-black"
                            >
                              −
                            </button>

                            <span className="min-w-10 text-center text-sm font-black">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="px-3 py-2 transition hover:bg-white hover:text-black"
                            >
                              +
                            </button>
                          </div>

                          <p className="font-black text-green-400">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 p-6">
                <div className="mb-5">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                    {t.shipping}
                  </label>

                  <select
                    value={shippingZone}
                    onChange={(e) =>
                      setShippingZone(
                        e.target.value as keyof typeof shippingRates
                      )
                    }
                    className="mt-3 w-full border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-green-400"
                  >
                    <option value="italy">{t.shippingItaly} — €7.00</option>
                    <option value="eu">{t.shippingEu} — €25.00</option>
                    <option value="world">{t.shippingWorld} — €70.00</option>
                  </select>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-5">
                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>{t.subtotal}</span>
                    <span>€{cartSubtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-zinc-400">
                    <span>{t.shipping}</span>
                    <span>
                      {cart.length > 0
                        ? `€${selectedShipping.price.toFixed(2)}`
                        : "€0.00"}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-white/10 pt-4 text-2xl font-black text-green-400">
                    <span>{t.total}</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <a
                  href={paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 block w-full px-7 py-4 text-center text-xs font-black uppercase tracking-[0.25em] transition ${
                    cart.length > 0
                      ? "bg-green-400 text-black hover:bg-white"
                      : "pointer-events-none bg-zinc-800 text-zinc-600"
                  }`}
                >
                  {t.payPaypal}
                </a>

                <p className="mt-4 text-xs leading-relaxed text-zinc-600">
                  {t.cartNote}
                </p>
              </div>
            </motion.aside>
          </div>
        )}

        <section
          id="booking"
          className="relative z-10 overflow-hidden border-t border-white/10 bg-black px-6 py-32 text-center md:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.16),transparent_35%)]" />

          <motion.div {...reveal} className="relative">
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-zinc-500">
              {t.bookingEyebrow}
            </p>

            <h2 className="text-5xl font-black uppercase tracking-tight md:text-7xl">
              {t.bookingTitle}
            </h2>

            <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <a
                href="mailto:iragreenofficial@gmail.com?subject=Booking%20Request%20-%20Ira%20Green&body=Hi%20Ira%20Green%20team%2C%0A%0AI%20would%20like%20to%20request%20information%20about%20booking%20Ira%20Green%20for%20an%20event.%0A%0AEvent%20date%3A%0ALocation%3A%0AType%20of%20event%3A%0AExpected%20audience%3A%0A%0AThank%20you."
                className="inline-flex items-center justify-center gap-3 border border-green-400/50 bg-green-400 px-10 py-5 text-sm font-black uppercase tracking-[0.25em] text-black transition hover:bg-white"
              >
                <HiMail className="text-xl" />
                {t.bookingEmail}
              </a>

              <a
                href={
                    language === "it"
                        ? "https://wa.me/393716708106?text=Ciao%20Marco%2C%20vorrei%20ricevere%20informazioni%20per%20organizzare%20un%20concerto%20di%20Ira%20Green."
                        : "https://wa.me/393716708106?text=Hi%20Marco%2C%20I%20would%20like%20information%20about%20booking%20Ira%20Green."
                        
}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-white/20 bg-black/30 px-10 py-5 text-sm font-black uppercase tracking-[0.25em] text-white backdrop-blur transition hover:border-green-400 hover:bg-green-400 hover:text-black"
              >
                <FaWhatsapp className="text-xl" />
                {t.bookingWhatsapp}
              </a>
            </div>
          </motion.div>
        </section>

        <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-black px-6 py-16 text-white">
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <a href="#top" className="transition hover:opacity-80">
                <Image
                  src="/ira-logo.png"
                  alt="Ira Green"
                  width={240}
                  height={70}
                  className="h-auto w-[180px]"
                />
              </a>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500">
                {t.footerClaim}
              </p>
            </div>

<div className="flex w-fit overflow-hidden rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.18em] backdrop-blur">
  <button
    onClick={() => setLanguage("en")}
    className={`px-4 py-2 transition ${
      language === "en"
        ? "bg-green-400 text-black"
        : "text-white/45 hover:text-green-400"
    }`}
  >
    EN
  </button>

  <button
    onClick={() => setLanguage("it")}
    className={`px-4 py-2 transition ${
      language === "it"
        ? "bg-green-400 text-black"
        : "text-white/45 hover:text-green-400"
    }`}
  >
    IT
  </button>
</div>
            <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.25em] text-zinc-500 md:items-end">
              <div className="flex flex-wrap gap-6">
                <a href="#bio" className="transition hover:text-white">
                  {t.navBio}
                </a>
                <a href="#live" className="transition hover:text-white">
                  {t.navConcerts}
                </a>
                <a href="#music" className="transition hover:text-white">
                  {t.navMusic}
                </a>
                <a href="#shop" className="transition hover:text-white">
                  {t.navShop}
                </a>
                <a href="#booking" className="transition hover:text-white">
                  {t.navBooking}
                </a>
              </div>

<div className="flex flex-col gap-3 text-[10px] tracking-[0.22em] text-zinc-600">
  <p>
    © {new Date().getFullYear()} Ira Green. {t.rights}
  </p>

  <p>
    Ira Green — P.IVA 02762180202
  </p>
</div>

<div className="mt-6 flex flex-wrap gap-5 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
 <a
  href="/privacy"
  className="transition hover:text-green-400"
>
  {t.footerPrivacy}
</a>

<a
  href="/cookie"
  className="transition hover:text-green-400"
>
  {t.footerCookie}
</a>

  <a
    href="/terms"
    className="transition hover:text-green-400"
  >
    {t.footerTerms}
  </a>
</div>
            </div>
          </div>
        </footer>
        {!cookieAccepted && (
  <div className="fixed bottom-5 left-1/2 z-[120] w-[92%] max-w-2xl -translate-x-1/2 border border-white/10 bg-black/90 p-5 shadow-2xl shadow-black backdrop-blur-2xl">
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.25em] text-green-400">
          {t.footerCookie}
        </p>

        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
{language === "it"
  ? "Questo sito utilizza cookie tecnici e servizi esterni come Spotify, PayPal e social media."
  : "This website uses technical cookies and external services such as Spotify, PayPal and social media."}
        </p>

        <div className="mt-3 flex gap-4 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          <a
            href="/privacy"
            className="transition hover:text-green-400"
          >
            Privacy
          </a>

          <a
            href="/cookie"
            className="transition hover:text-green-400"
          >
            Cookie
          </a>

          <a
            href="/terms"
            className="transition hover:text-green-400"
          >
            {t.footerTerms}
          </a>
        </div>
      </div>

      <button
        onClick={acceptCookies}
        className="border border-green-400 bg-green-400 px-6 py-3 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:bg-white"
      >
        {language === "it" ? "Accetta" : "Accept"}
      </button>
    </div>
  </div>
)}
      </main>
    </>
  );
}
