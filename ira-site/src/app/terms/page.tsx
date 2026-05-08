export default function TermsPage() {
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
          Condizioni di Vendita
        </h1>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-400">
          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Venditore
            </h2>

            <p>
              Arianna Carpentieri — P.IVA 02762180202
            </p>

            <p>
              Sede: Mantova, Italia
            </p>

            <p>
              Email:{" "}
              <a
                href="mailto:info@iragreen.it"
                className="text-green-400"
              >
                info@iragreen.it
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Prodotti
            </h2>

            <p>
              Il sito vende merchandising ufficiale, album musicali e prodotti
              fisici legati al progetto artistico Ira Green.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Prezzi
            </h2>

            <p>
              Tutti i prezzi sono espressi in Euro (€).
            </p>

            <p>
              Le spese di spedizione vengono aggiunte durante il checkout in
              base all’area geografica selezionata.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Pagamenti
            </h2>

            <p>
              I pagamenti vengono gestiti tramite PayPal.
            </p>

            <p>
              Il venditore non memorizza dati relativi a carte di credito o
              strumenti di pagamento.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Spedizioni
            </h2>

            <p>
              Le spedizioni vengono effettuate verso Italia, Unione Europea e
              resto del mondo.
            </p>

            <p>
              I tempi di consegna possono variare in base alla destinazione e
              ai servizi logistici utilizzati.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Diritto di recesso
            </h2>

            <p>
              L’utente può contattare il venditore entro 14 giorni dalla
              consegna per eventuali problematiche relative all’ordine.
            </p>

            <p>
              Eventuali resi o sostituzioni saranno valutati caso per caso.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-black uppercase text-white">
              Contatti
            </h2>

            <p>
              Per assistenza ordini o informazioni:
            </p>

            <p>
              <a
                href="mailto:info@iragreen.it"
                className="text-green-400"
              >
                info@iragreen.it
              </a>
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