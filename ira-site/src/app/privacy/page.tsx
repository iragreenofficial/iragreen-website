export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white md:px-16">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="text-xs font-black uppercase tracking-[0.25em] text-green-400 hover:text-white"
        >
          ← Torna al sito
        </a>

        <h1 className="mt-10 text-4xl font-black uppercase md:text-6xl">
          Privacy Policy
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-400">
          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Titolare del trattamento
            </h2>
            <p>
              Il titolare del trattamento dei dati è Arianna Carpentieri, P.IVA
              02762180202, con sede in Mantova, Italia.
            </p>
            <p>
              Email di contatto:{" "}
              <a className="text-green-400" href="mailto:info@iragreen.it">
                info@iragreen.it
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Dati raccolti
            </h2>
            <p>
              Il sito può raccogliere dati forniti volontariamente tramite email,
              WhatsApp, richieste di booking o acquisti tramite PayPal.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Finalità
            </h2>
            <p>
              I dati vengono utilizzati per rispondere alle richieste,
              gestire comunicazioni, booking, ordini, pagamenti e adempimenti
              amministrativi o fiscali.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Servizi esterni
            </h2>
            <p>
              Il sito può integrare servizi di terze parti come PayPal, Spotify,
              YouTube, Instagram, Facebook, TikTok e WhatsApp. Tali servizi
              possono trattare dati secondo le proprie informative privacy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Diritti dell’utente
            </h2>
            <p>
              L’utente può richiedere accesso, modifica, cancellazione o
              limitazione del trattamento dei propri dati scrivendo a
              info@iragreen.it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Ultimo aggiornamento
            </h2>
            <p>Maggio 2026.</p>
          </section>
        </div>
      </div>
    </main>
  );
}