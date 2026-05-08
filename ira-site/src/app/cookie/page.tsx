export default function CookiePolicy() {
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
          Cookie Policy
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-400">
          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Titolare
            </h2>
            <p>
              Arianna Carpentieri, P.IVA 02762180202, sede in Mantova, Italia.
            </p>
            <p>
              Email:{" "}
              <a className="text-green-400" href="mailto:info@iragreen.it">
                info@iragreen.it
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Cosa sono i cookie
            </h2>
            <p>
              I cookie sono piccoli file utilizzati dai siti web per migliorare
              la navigazione, ricordare preferenze tecniche o permettere il
              funzionamento di servizi esterni.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Cookie tecnici
            </h2>
            <p>
              Il sito può usare cookie tecnici necessari al funzionamento della
              navigazione e del consenso cookie.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Servizi di terze parti
            </h2>
            <p>
              Il sito integra contenuti e link verso servizi esterni come
              Spotify, YouTube, PayPal, Instagram, Facebook, TikTok e WhatsApp.
              Questi servizi possono installare cookie o raccogliere dati secondo
              le proprie informative.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Gestione del consenso
            </h2>
            <p>
              L’utente può accettare il banner cookie alla prima visita. È
              possibile cancellare il consenso rimuovendo i dati del sito dalle
              impostazioni del browser.
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