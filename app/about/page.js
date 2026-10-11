// Route : /about  (composant serveur)
// MODIFIE tous les textes et chiffres ci-dessous : ce sont des exemples.
import Link from "next/link";
import { LuHeart, LuGem, LuBadgeCheck, LuMapPin, LuClock, LuArrowRight } from "react-icons/lu";
import SafeImage from "@/components/SafeImage/safeimage";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./page.module.css";

const story = {
  title: "Une passion pour la beauté des femmes d'Abidjan",
  // MODIFIE : ta photo dans /public/images/about.jpg
  image: "/fondMain (2).png",
  imageAlt: "L'équipe du salon Éclat à Abidjan",
  paragraphs: [
    "Éclat est né d'une idée simple : une femme qui se sent belle avance différemment. Nous coiffons et maquillons à Abidjan avec le même soin, que ce soit pour un quotidien soigné ou le plus grand jour de sa vie.",
    "Tresses africaines, tissages, perruques, maquillage naturel ou glamour : chaque prestation est préparée avec des produits adaptés aux cheveux crépus et aux peaux noires, et réalisée dans le respect de tes envies.",
  ],
};

// MODIFIE : vrais chiffres de ton salon
const stats = [
  { id: "annees", value: "5+", label: "années d'expérience" },
  { id: "clientes", value: "1 000+", label: "clientes coiffées" },
  { id: "prestation", value: "20+", label: "prestation proposées" },
];

const values = [
  { id: "ecoute", icon: LuHeart, title: "À l'écoute", text: "Nous prenons le temps de comprendre ton style, ton budget et l'occasion avant de commencer." },
  { id: "qualite", icon: LuGem, title: "Finitions soignées", text: "Des tresses régulières, des raies nettes et un maquillage qui tient toute la journée." },
  { id: "confiance", icon: LuBadgeCheck, title: "Tarifs clairs", text: "Les prix en FCFA sont affichés pour chaque prestation, sans mauvaise surprise le jour J." },
];

export const metadata = {
  title: "À propos",
  description:
    "Découvrez Éclat, salon de coiffure africaine et de maquillage à Abidjan : notre histoire, nos valeurs, notre adresse et nos horaires.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={`container ${styles.story}`}>
        <div className={styles.storyText}>
          <p className="eyebrow">À propos</p>
          <h1 className={styles.title}>{story.title}</h1>
          {story.paragraphs.map((text) => (
            <p key={text.slice(0, 24)} className={styles.paragraph}>{text}</p>
          ))}
          <Link href="/reservation" className="btn btn-primary">
            Prendre rendez-vous <LuArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.photo}>
          <SafeImage
            src={story.image}
            alt={story.imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            className={styles.photoImg}
          />
        </div>
      </section>

      <section className={`container ${styles.stats}`} aria-label="Éclat en chiffres">
        {stats.map((stat) => (
          <div key={stat.id} className={styles.stat}>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </section>

      <section className={`container ${styles.values}`} aria-labelledby="titre-valeurs">
        <h2 id="titre-valeurs" className="section-title">Ce qui nous guide</h2>
        <ul className={styles.valueGrid}>
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <li key={value.id} className={styles.value}>
                <Icon size={26} aria-hidden="true" />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={`container ${styles.info}`}>
        <h2 className="section-title">Nous trouver</h2>
        <address className={styles.address}>
          <p><LuMapPin aria-hidden="true" /> {siteConfig.address}</p>
          <p><LuClock aria-hidden="true" /> {siteConfig.hours}</p>
        </address>
      </section>
    </div>
  );
}
