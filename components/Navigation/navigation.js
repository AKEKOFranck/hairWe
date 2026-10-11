"use client";
// "use client" obligatoire : on utilise useState / useEffect / usePathname
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LuMenu, LuX, LuCalendarDays } from "react-icons/lu";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./navigation.module.css";

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fond opaque dès qu'on descend un peu dans la page
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Onglet actif : l'accueil doit être exactement "/", les autres contiennent leur clé
  const isActive = (activeKey) =>
    activeKey === "" ? pathname === "/" : pathname.includes(activeKey);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo : le fichier vient de /public/LogoHair.svg */}
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)} aria-label={`${siteConfig.name}, accueil`}>
          <Image
            src={siteConfig.logo}
            alt=""
            width={44}
            height={44}
            className={styles.logoImg}
            priority
          />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{siteConfig.name}</span>
            <span className={styles.brandTag}>{siteConfig.baseline}</span>
          </span>
        </Link>

        {/* Les 4 onglets sont générés avec map depuis siteConfig.navLinks */}
        <nav
          id="menu-principal"
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
          aria-label="Navigation principale"
        >
          <ul className={styles.list}>
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.link} ${isActive(link.activeKey) ? styles.active : ""}`}
                  aria-current={isActive(link.activeKey) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Bouton visible seulement dans le menu mobile */}
            <li className={styles.mobileOnly}>
              <Link href="/reservation" className="btn btn-primary" onClick={() => setOpen(false)}>
                <LuCalendarDays aria-hidden="true" /> Prendre rendez-vous
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/reservation" className={`btn btn-primary ${styles.cta}`}>
            Prendre rendez-vous
          </Link>
          <button
            type="button"
            className={styles.burger}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <LuX size={26} /> : <LuMenu size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
}
