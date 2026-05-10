import { notFound } from "next/navigation";
import Image from "next/image";
import { lyricsAlbums } from "../../data/lyrics";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const album = lyricsAlbums.find((album) =>
  album.songs.some(
    (song) =>
      song.slug?.toLowerCase().trim() === slug.toLowerCase().trim()
  )
);

const song = album?.songs.find(
  (song) =>
    song.slug?.toLowerCase().trim() === slug.toLowerCase().trim()
);

  if (!song) {
    return {
      title: "Lyrics | Ira Green",
    };
  }

  return {
  title: `${song.title} Lyrics | Ira Green`,
  description: `Official lyrics for ${song.title} by Ira Green${
    album ? ` from the album ${album.title}` : ""
  }.`,
};
}

export default async function LyricsPage({ params }: Props) {
  const { slug } = await params;

  const album = lyricsAlbums.find((album) =>
  album.songs.some(
    (song) =>
      song.slug?.toLowerCase().trim() === slug.toLowerCase().trim()
  )
);

const song = album?.songs.find(
  (song) =>
    song.slug?.toLowerCase().trim() === slug.toLowerCase().trim()
);

  if (!song) {
    notFound();
  }

  return (
  <main className="relative min-h-screen overflow-hidden bg-black px-6 py-24 text-white md:px-16">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_30%)]" />

    <div className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:90px_90px]" />

    <div className="relative mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.85fr_1.15fr] md:items-start">
      <aside className="md:sticky md:top-24">
        <a
          href="/#lyrics"
          className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 transition hover:text-green-400"
        >
          ← Back to Lyrics
        </a>

        {album && (
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/80">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={album.image}
                alt={album.title}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.16),transparent_60%)]" />

              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">
                  Album
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase leading-none tracking-tight">
                  {album.title}
                </h2>

                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {album.year}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/70 p-8 shadow-2xl shadow-black/80 backdrop-blur md:p-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_42%)]" />

        <div className="relative">
          <p className="text-xs uppercase tracking-[0.35em] text-green-400">
            Official Lyrics
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
            {song.title}
          </h1>

          {album && (
            <p className="mt-6 text-sm uppercase tracking-[0.28em] text-zinc-500">
              {album.title} • {album.year}
            </p>
          )}

          <p className="mt-8 max-w-2xl text-sm italic leading-relaxed text-zinc-500">
            Words written between rage, identity and distortion.
          </p>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-green-400/40 via-white/10 to-transparent" />

          <div className="mt-12 space-y-2 text-lg leading-relaxed text-zinc-300">
            {song.text.split("\n").map((line, index) => {
              const isSectionLabel = [
                "intro",
                "verse",
                "pre-chorus",
                "chorus",
                "bridge",
                "hook",
                "outro",
              ].includes(line.trim().toLowerCase());

              return (
                <p
                  key={`${line}-${index}`}
                  className={
                    isSectionLabel
                      ? "mt-8 text-xs font-black uppercase tracking-[0.35em] text-green-400"
                      : line.trim() === ""
                      ? "h-4"
                      : "text-zinc-300"
                  }
                >
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  </main>
);
}