// =====================================================================
// Route : /skills/[slug]/coiffure   (composant serveur)
// /skills/tresses/coiffure -> slug = "tresses". "tout" = toutes les coiffures.
// =====================================================================
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PrestationGrid from "@/components/PrestationGrid/prestationgrid";
import { getCategories, getCollection, getprestation } from "@/lib/prestation";
import styles from "./page.module.css";

const content = {
  eyebrow: "Nos prestations",
  title: "Coiffures africaines à Abidjan",
  text: "Tresses, tissages, perruques et coiffures de cérémonie. Choisis ta coiffure, découvre le tarif, puis réserve en quelques clics.",
};

// Génère une page par catégorie (tout, tresses, tissages, ...)
export function generateStaticParams() {
  return getCategories("coiffure").map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getCategories("coiffure").find((c) => c.slug === slug);
  const suffix = cat && slug !== "tout" ? ` : ${cat.label}` : "";

  return {
    title: `Coiffures africaines à Abidjan${suffix}`,
    description:
      "Tarifs en FCFA des coiffures à Abidjan : box braids, knotless, fulani, faux locs, tissages, perruques et coiffures de mariée. Réservation rapide via WhatsApp.",
    alternates: { canonical: `/skills/${slug}/coiffure` },
  };
}

// ---------------------------------------------------------------------
// PAGE : elle ne lit PAS params. Elle affiche tout de suite le titre
// (partie statique) et passe la "promesse" params à la partie dynamique.
// ---------------------------------------------------------------------
export default function CoiffurePage({ params }) {
  return (
    <section className={`container ${styles.page}`}>
      <header className={styles.head}>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className={styles.title}>{content.title}</h1>
        <p className="section-lead">{content.text}</p>
      </header>

      <Suspense fallback={<p className={styles.note}>Chargement des coiffures…</p>}>
        <CoiffureList params={params} />
      </Suspense>
    </section>
  );
}

// ---------------------------------------------------------------------
// PARTIE DYNAMIQUE : c'est ici qu'on lit le slug (await params).
// ---------------------------------------------------------------------
async function CoiffureList({ params }) {
  const { slug } = await params;

  const collection = getCollection("coiffure");
  const categories = getCategories("coiffure");

  // Slug inconnu -> page 404
  if (!categories.some((c) => c.slug === slug)) notFound();

  const items = getprestation("coiffure", slug);

  return (
    <>
      <nav className={styles.filters} aria-label="Filtrer les coiffures par catégorie">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/skills/${cat.slug}/coiffure`}
            className={`${styles.chip} ${cat.slug === slug ? styles.chipActive : ""}`}
            aria-current={cat.slug === slug ? "page" : undefined}
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      <PrestationGrid
        items={items}
        type="coiffure"
        categories={collection.categories}
        devise={collection.devise}
      />

      <p className={styles.note}>{collection.note}</p>
    </>
  );
}