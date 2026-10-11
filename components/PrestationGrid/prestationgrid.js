// Grille de prestations réutilisée sur : accueil, page coiffures, page maquillage.
// Composant serveur : il reçoit les données (issues des JSON) et fait un map.
// (Pas de "use client" : il n'utilise ni état, ni événement.)
import Link from "next/link";
import { LuClock, LuCalendarDays } from "react-icons/lu";
import SafeImage from "@/components/SafeImage/safeimage";
import { formatPrice } from "@/lib/prestation";
import styles from "./prestationgrid.module.css";

export default function PrestationGrid({ items = [], type, categories = [], devise = "FCFA" }) {
  if (!items.length) {
    return <p className={styles.empty}>Aucune prestation dans cette catégorie pour le moment.</p>;
  }

  const labelOf = (slug) => categories.find((c) => c.slug === slug)?.label ?? "";

  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.id} className={styles.card}>
          <div className={styles.media}>
            <SafeImage
              src={item.image}
              alt={`${item.nom} à Abidjan`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.img}
            />
            {labelOf(item.categorie) && (
              <span className={styles.badge}>{labelOf(item.categorie)}</span>
            )}
          </div>

          <div className={styles.body}>
            <h3 className={styles.name}>{item.nom}</h3>
            <p className={styles.desc}>{item.description}</p>

            <div className={styles.meta}>
              <span className={styles.duration}>
                <LuClock aria-hidden="true" /> {item.duree}
              </span>
              <p className={styles.price}>
                <span>À partir de</span> {formatPrice(item.prix, devise)}
              </p>
            </div>

            <Link
              href={`/reservation?type=${type}&service=${item.id}`}
              className={`btn btn-primary ${styles.reserve}`}
              aria-label={`Réserver : ${item.nom}`}
            >
              <LuCalendarDays aria-hidden="true" /> Réserver
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}