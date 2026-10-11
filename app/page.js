// =====================================================================
// PAGE D'ACCUEIL (composant serveur)
// Tout le contenu est dans des objets JS ci-dessous : modifie les textes ici.
// =====================================================================
import Link from "next/link";
import { LuScissors, LuPalette, LuHeart, LuArrowRight, LuMessageCircle, LuCalendarCheck, LuGem } from "react-icons/lu";
import SafeImage from "@/components/SafeImage/safeimage";
import PrestationGrid from "@/components/PrestationGrid/prestationgrid";
import { getCollection, getPopulaires } from "@/lib/prestation";
import styles from "./page.module.css";

export const metadata = {
  title: "Coiffure & maquillage à Abidjan | Tresses, tissages, mariée",
  description:
    "Éclat, votre salon de coiffure africaine et de maquillage à Abidjan. Box braids, knotless, perruques, maquillage glamour et mariée. Tarifs en FCFA, réservation WhatsApp.",
  alternates: { canonical: "/" },
};

// ---------- Contenu du hero ----------
const hero = {
  eyebrow: "Coiffure & maquillage",
  titleLine1: "Révélez votre beauté,",
  titleLine2: "notre passion",
  text: "Des coiffures élégantes, un maquillage sur-mesure, pour chaque femme, chaque occasion.",
  cta: { label: "Prendre rendez-vous", href: "/reservation" },
  // MODIFIE : mets ta photo dans /public/images/hero.jpg (idéal : portrait, sujet à droite)
  image: "/fondMain (1).png",
  imageAlt: "Femme élégante coiffée et maquillée au salon Éclat à Abidjan",
};

// ---------- Les 3 points forts sous le hero (icônes react-icons) ----------
const highlights = [
  { id: "coiffures", icon: LuScissors, title: "Coiffures", text: "Tendances & élégantes", href: "/skills/tout/coiffure" },
  { id: "maquillage", icon: LuPalette, title: "Maquillage", text: "Naturel & glamour", href: "/skills/tout/makeup" },
  { id: "conseils", icon: LuHeart, title: "Conseils beauté", text: "Pour révéler votre style", href: "/about" },
];

// ---------- Pourquoi nous choisir ----------
// MODIFIE ces textes pour qu'ils collent à ton salon
const reasons = [
  { id: "mains", icon: LuGem, title: "Des mains expertes", text: "Tresses nettes, finitions soignées et conseils adaptés à ta texture de cheveux et à ton teint." },
  { id: "mesure", icon: LuPalette, title: "Du sur-mesure", text: "Chaque coiffure et chaque maquillage est pensé pour ta tenue, ton événement et ta personnalité." },
  { id: "simple", icon: LuMessageCircle, title: "Une réservation simple", text: "Tu choisis ta prestation, tu remplis le formulaire et ta demande arrive directement sur WhatsApp." },
];

// ---------- Étapes de réservation (là, c'est bien une suite d'actions) ----------
const steps = [
  { id: "choisir", icon: LuScissors, title: "Choisis ta prestation", text: "Parcours les coiffures et les maquillages avec leurs tarifs." },
  { id: "reserver", icon: LuCalendarCheck, title: "Remplis le formulaire", text: "Date, heure, quartier : ta demande est prête en une minute." },
  { id: "confirmer", icon: LuMessageCircle, title: "Confirme sur WhatsApp", text: "Nous te répondons pour valider ton créneau." },
];

export default function HomePage() {
  const hair = getCollection("coiffure");
  const makeup = getCollection("makeup");

  return (
    <>
      {/* ================= HERO ================= */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroMedia}>
          <SafeImage
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            {hero.titleLine1} <em>{hero.titleLine2}</em>
          </h1>
          <p className={styles.heroText}>{hero.text}</p>
          <Link href={hero.cta.href} className="btn btn-primary">
            {hero.cta.label} <LuArrowRight aria-hidden="true" />
          </Link>
        </div>

        <ul className={`container ${styles.highlights}`}>
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Link href={item.href} className={styles.highlight}>
                  <span className={styles.highlightIcon}><Icon size={26} aria-hidden="true" /></span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.text}</small>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ================= COIFFURES PHARES ================= */}
      <section className={`container ${styles.section}`} aria-labelledby="titre-coiffures">
        <header className={styles.sectionHead}>
          <div>
            <h2 id="titre-coiffures" className="section-title">Nos coiffures préférées</h2>
            <p className="section-lead">Tresses africaines, tissages et coiffures de cérémonie aux tarifs d'Abidjan.</p>
          </div>
          <Link href="/skills/tout/coiffure" className="btn btn-outline">
            Toutes les coiffures <LuArrowRight aria-hidden="true" />
          </Link>
        </header>
        <PrestationGrid
          items={getPopulaires("coiffure", 3)}
          type="coiffure"
          categories={hair.categories}
          devise={hair.devise}
        />
      </section>

      {/* ================= MAQUILLAGE PHARES ================= */}
      <section className={`container ${styles.section}`} aria-labelledby="titre-maquillage">
        <header className={styles.sectionHead}>
          <div>
            <h2 id="titre-maquillage" className="section-title">Le maquillage qui te ressemble</h2>
            <p className="section-lead">Du teint frais du quotidien au grand soir ou au jour de ton mariage.</p>
          </div>
          <Link href="/skills/tout/makeup" className="btn btn-outline">
            Tous les maquillages <LuArrowRight aria-hidden="true" />
          </Link>
        </header>
        <PrestationGrid
          items={getPopulaires("makeup", 3)}
          type="makeup"
          categories={makeup.categories}
          devise={makeup.devise}
        />
      </section>

      {/* ================= POURQUOI NOUS ================= */}
      <section className={`container ${styles.section}`} aria-labelledby="titre-pourquoi">
        <h2 id="titre-pourquoi" className="section-title">Pourquoi choisir Éclat</h2>
        <ul className={styles.reasons}>
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <li key={reason.id} className={styles.reason}>
                <span className={styles.reasonIcon}><Icon size={24} aria-hidden="true" /></span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ================= COMMENT RÉSERVER ================= */}
      <section className={`container ${styles.section}`} aria-labelledby="titre-etapes">
        <h2 id="titre-etapes" className="section-title">Réserver en trois étapes</h2>
        <ol className={styles.steps}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.id} className={styles.step}>
                <Icon size={28} aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ================= APPEL FINAL ================= */}
      <section className={`container ${styles.final}`}>
        <h2 className="section-title">Prête pour ton prochain rendez-vous ?</h2>
        <p className="section-lead">Choisis ta prestation et envoie ta demande en quelques clics.</p>
        <Link href="/reservation" className="btn btn-primary">Prendre rendez-vous</Link>
      </section>
    </>
  );
}
