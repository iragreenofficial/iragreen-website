"use client";

import { useState } from "react";
import {
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaTiktok,
  FaFacebookF,
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      <div id="top" />

      <main className="bg-black text-white min-h-screen overflow-x-hidden">
        <section className="relative h-screen w-full overflow-hidden">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-45">
            <source src="/Ira-Hero-prova.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_85%)]" />

          <nav className="absolute top-0 left-0 z-20 flex w-full items-center justify-between px-8 py-6 md:px-16">
            <a href="#top" className="text-sm font-bold tracking-[0.35em] transition hover:text-zinc-300">
              IRA GREEN
            </a>

            <div className="hidden gap-8 text-xs uppercase tracking-[0.25em] text-zinc-300 md:flex">
              <a href="#music" className="hover:text-white">Music</a>
              <a href="#live" className="hover:text-white">Live</a>
              <a href="#shop" className="hover:text-white">Shop</a>
              <a href="#bio" className="hover:text-white">Bio</a>
              <a href="#booking" className="hover:text-white">Booking</a>
            </div>
          </nav>

          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-5 text-lg">
            <a href="https://www.instagram.com/iragreenofficial/" target="_blank" rel="noopener noreferrer" className="text-white/50 transition hover:scale-110 hover:text-white"><FaInstagram /></a>
            <a href="https://open.spotify.com/artist/58eTshTblzJjY7vJ2KVzhq" target="_blank" rel="noopener noreferrer" className="text-white/50 transition hover:scale-110 hover:text-white"><FaSpotify /></a>
            <a href="https://www.youtube.com/c/iragreenofficial/" target="_blank" rel="noopener noreferrer" className="text-white/50 transition hover:scale-110 hover:text-white"><FaYoutube /></a>
            <a href="https://www.tiktok.com/@ira_green_official" target="_blank" rel="noopener noreferrer" className="text-white/50 transition hover:scale-110 hover:text-white"><FaTiktok /></a>
            <a href="https://www.facebook.com/iragreenofficial/" target="_blank" rel="noopener noreferrer" className="text-white/50 transition hover:scale-110 hover:text-white"><FaFacebookF /></a>
          </div>

          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
            <div className="ira-reveal">
              <p className="mb-5 text-xs uppercase tracking-[0.45em] text-zinc-400">
                Official Website
              </p>

              <h1 className="text-6xl font-black tracking-[0.18em] md:text-8xl">
                IRA GREEN
              </h1>

              <p className="mt-6 text-xl text-zinc-300 md:text-2xl">
                Rock voice. No filters. No apologies.
              </p>

              <div className="mt-10 flex justify-center gap-4">
                <a href="#music" className="bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-300">
                  Listen
                </a>

                <a href="#booking" className="border border-white/40 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
                  Booking
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="bio" className="border-t border-white/10 px-6 py-28 md:px-16">
          <div className="ira-reveal mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.4em] text-zinc-500">
                Biography
              </p>
              <h2 className="text-4xl font-black leading-tight md:text-6xl">
                Built for the stage.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
              <p>
                Ira Green is an Italian rock artist known for a powerful voice,
                dark cinematic visuals and raw live energy.
              </p>
              <p className="text-zinc-500">
                A project built around attitude, identity and impact.
              </p>
            </div>
          </div>
        </section>

        <section id="live" className="border-t border-white/10 bg-zinc-950 px-6 py-28 md:px-16">
          <div className="ira-reveal mx-auto max-w-6xl">
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-zinc-500">
              Live Dates
            </p>

            <h2 className="mb-12 text-4xl font-black md:text-6xl">
              Upcoming Shows
            </h2>

            <div className="space-y-4">
              {[
                ["17 JAN 2026", "Conary Mor", "Brescia"],
                ["07 MAR 2026", "Mc Ryan's feat. Pino Scotto", "Torino"],
                ["15 MAY 2026", "Mr. Hop", "Novara"],
              ].map(([date, venue, city]) => (
                <div key={date} className="flex flex-col justify-between gap-4 border border-white/10 p-6 transition hover:border-white/40 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{date}</p>
                    <h3 className="mt-2 text-2xl font-bold">{venue}</h3>
                  </div>
                  <p className="text-zinc-300">{city}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="music" className="border-t border-white/10 px-6 py-28 text-center md:px-16">
          <div className="ira-reveal">
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-zinc-500">
              Music
            </p>

            <h2 className="mb-6 text-4xl font-black md:text-6xl">
              Listen Now
            </h2>

            <p className="mx-auto mb-12 max-w-2xl text-zinc-400">
              The sound is not here to behave.
            </p>

            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-zinc-950 p-2 shadow-2xl">
              <iframe
                data-testid="embed-iframe"
                className="rounded-xl"
                src="https://open.spotify.com/embed/track/4y2lhBrPGcSxdzUHRuQaCC?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>

            <a href="https://open.spotify.com/artist/58eTshTblzJjY7vJ2KVzhq" target="_blank" rel="noopener noreferrer" className="mt-10 inline-block border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] transition hover:bg-white hover:text-black">
              Open Spotify
            </a>
          </div>
        </section>

        <section id="shop" className="border-t border-white/10 bg-black px-6 py-28 md:px-16">
          <div className="ira-reveal mx-auto max-w-6xl">
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-zinc-500">
              Shop
            </p>

            <h2 className="mb-12 text-4xl font-black md:text-6xl">
              Official Merch
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                ["T-Shirt", "Ira Green official tee"],
                ["CD / Album", "Physical releases"],
                ["Bundle", "Merch pack"],
              ].map(([title, desc]) => (
                <div key={title} className="border border-white/10 bg-zinc-950 p-8 transition hover:border-white/40">
                  <div className="mb-8 flex h-64 items-center justify-center bg-zinc-900 text-zinc-700">
                    IMAGE
                  </div>

                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p className="mt-3 text-zinc-500">{desc}</p>

                  <button className="mt-8 border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="border-t border-white/10 px-6 py-32 text-center md:px-16">
          <div className="ira-reveal">
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-zinc-500">
              Booking & Contact
            </p>

            <h2 className="text-5xl font-black md:text-7xl">
              Let&apos;s make noise.
            </h2>

            <a href="mailto:iragreenofficial@gmail.com?subject=Booking%20Request%20-%20Ira%20Green&body=Hi%20Ira%20Green%20team%2C%0A%0AI%20would%20like%20to%20request%20information%20about%20booking%20Ira%20Green%20for%20an%20event.%0A%0AEvent%20date%3A%0ALocation%3A%0AType%20of%20event%3A%0AExpected%20audience%3A%0A%0AThank%20you." className="mt-10 inline-block bg-white px-10 py-5 text-sm font-bold uppercase tracking-[0.25em] text-black transition hover:bg-zinc-300">
              Book Ira Green
            </a>
          </div>
        </section>
      </main>
    </>
  );
}