"use client";
// =====================================================================
// SafeImage : comme <Image />, mais si l'image n'existe pas encore
// (tu ajoutes tes photos plus tard), on affiche un joli fond dégradé
// au lieu d'une image cassée.
// IMPORTANT : le parent doit avoir "position: relative" (on utilise fill).
// =====================================================================
import { useState } from "react";
import Image from "next/image";
import styles from "./safeimage.module.css";

export default function SafeImage({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className={styles.placeholder} role="img" aria-label={alt} />;
  }

  return <Image src={src} alt={alt} onError={() => setFailed(true)} {...props} />;
}
