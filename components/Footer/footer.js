// Footer : composant serveur (pas besoin de "use client", il n'y a ni état ni événement)
import Link from "next/link";
import { FaInstagram, FaTiktok, FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import { LuMapPin, LuClock } from "react-icons/lu";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./footer.module.css";

// Relie l'id d'un réseau (siteConfig.socials) à son icône
const socialIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
};

export default function Footer() {
 

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandBlock}>
          <p className={styles.brandName}>{siteConfig.name}</p>
          <p className={styles.tagline}>
            Coiffure et maquillage à {siteConfig.city}, pour chaque femme et chaque occasion.
          </p>
          <ul className={styles.socials}>
            {siteConfig.socials.map((social) => {
              const Icon = socialIcons[social.id];
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={styles.socialLink}
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Liens du pied de page">
          <ul className={styles.links}>
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/reservation">Réserver</Link>
            </li>
          </ul>
        </nav>

        <address className={styles.contact}>
          <p><LuMapPin aria-hidden="true" /> {siteConfig.address}</p>
          <p><LuClock aria-hidden="true" /> {siteConfig.hours}</p>
        </address>
      </div>

      <div className={styles.bottom}>
        <p>© . Tous droits réservés.</p>
      </div>
    </footer>
  );
}
