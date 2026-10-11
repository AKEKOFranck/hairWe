// =====================================================================
// Route : /reservation   (page qui affiche le formulaire WhatsApp)
// L'en-tête est ici, le formulaire est dans components/WhatsAppForm
// useSearchParams() dans le formulaire impose un <Suspense>
// =====================================================================
import { Suspense } from "react";
import WhatsAppForm from "@/components/WhatsAppForm/whatsappform";
import styles from "./page.module.css";

export const metadata = {
  title: "Réserver une prestation",
  description:
    "Réservez votre coiffure ou votre maquillage à Abidjan : choisissez la prestation, la date et l'heure, puis envoyez votre demande sur WhatsApp.",
  alternates: { canonical: "/reservation" },
};

export default function ReservationPage() {
  return (
    <section className={`container ${styles.page}`}>
      <header className={styles.head}>
        <p className="eyebrow">Réservation</p>
        <h1 className={styles.title}>Réserve ta prestation</h1>
        <p className="section-lead">
          Remplis le formulaire : ta demande s'ouvre dans WhatsApp, il ne te reste qu'à l'envoyer.
        </p>
      </header>

      <Suspense fallback={null}>
        <WhatsAppForm />
      </Suspense>
    </section>
  );
}
