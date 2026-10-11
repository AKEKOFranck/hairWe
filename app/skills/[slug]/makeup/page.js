// =====================================================================
// Route : /skills/[slug]/makeup   (composant serveur)
// /skills/mariage/makeup -> slug = "mariage"  |  "tout" = tous les maquillages
// =====================================================================
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PrestationGrid from "@/components/PrestationGrid/prestationgrid";
import { getCategories, getCollection, getprestation } from "@/lib/prestation";
import styles from "./page.module.css";

const content = {
  eyebrow: "Nos prestations",
  title: "Maquillage à Abidjan, du naturel au glamour",
  text: "Maquillage de jour, de soirée, de mariée ou de shooting. Chaque teint est travaillé avec des produits adaptés aux peaux noires et métissées.",
};

export function generateStaticParams() {
  return getCategories("makeup").map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getCategories("makeup").find((c) => c.slug === slug);
  const suffix = cat && slug !== "tout" ? ` : ${cat.label}` : "";

  return {
    title: `Maquillage à Abidjan${suffix}`,
    description:
      "Tarifs en FCFA du maquillage à Abidjan : naturel, glamour, mariée, mariage coutumier, shooting et cours d'auto-maquillage. Réservation via WhatsApp.",
    alternates: { canonical: `/skills/${slug}/makeup` },
  };
}

// PAGE : ne lit pas params, affiche tout de suite l'en-tête statique.
export default function MakeupPage({ params }) {
  return (
    <section className={`container ${styles.page}`}>
      <header className={styles.head}>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className={styles.title}>{content.title}</h1>
        <p className="section-lead">{content.text}</p>
      </header>

      <Suspense fallback={<p className={styles.note}>Chargement des maquillages…</p>}>
        <MakeupList params={params} />
      </Suspense>
    </section>
  );
}

// PARTIE DYNAMIQUE : c'est ici qu'on lit le slug (await params).
async function MakeupList({ params }) {
  const { slug } = await params;

  const collection = getCollection("makeup");
  const categories = getCategories("makeup");

  if (!categories.some((c) => c.slug === slug)) notFound();

  const items = getprestation("makeup", slug);

  return (
    <>
      <nav className={styles.filters} aria-label="Filtrer les maquillages par catégorie">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/skills/${cat.slug}/makeup`}
            className={`${styles.chip} ${cat.slug === slug ? styles.chipActive : ""}`}
            aria-current={cat.slug === slug ? "page" : undefined}
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      <PrestationGrid
        items={items}
        type="makeup"
        categories={collection.categories}
        devise={collection.devise}
      />

      <p className={styles.note}>{collection.note}</p>
    </>
  );
}