// =====================================================================
// CONFIGURATION GÉNÉRALE DU SITE
// Tout ce que tu peux avoir envie de modifier est ici (nom, numéro, réseaux...)
// =====================================================================

export const siteConfig = {
  name: "Éclat",
  baseline: "Coiffure & Maquillage",
  // MODIFIE : l'adresse finale du site une fois en ligne (utile pour le SEO)
  url: "https://www.eclat-abidjan.com",
  description:
    "Éclat, salon de coiffure et de maquillage à Abidjan : tresses africaines, tissages, coiffures de mariage, maquillage naturel, glamour et mariée. Tarifs en FCFA et réservation via WhatsApp.",
  keywords: [
    "coiffure Abidjan",
    "maquillage Abidjan",
    "tresses africaines",
    "box braids Abidjan",
    "maquillage mariée Abidjan",
    "salon de coiffure Cocody",
    "tarifs coiffure FCFA",
  ],
  city: "Abidjan",
  country: "CI",

  // MODIFIE : numéro WhatsApp au format international SANS le "+" ni espaces
  // Côte d'Ivoire = 225 + numéro. Exemple : "2250707070707"
  whatsappNumber: "2250700000000",
  phoneDisplay: "+225 07 00 00 00 00",
  email: "contact@eclat-abidjan.com",

  // MODIFIE : adresse réelle du salon
  address: "Cocody, Abidjan, Côte d'Ivoire",
  hours: "Lundi – Samedi : 8h00 – 19h00",

  // Logos présents dans /public
  logo: "/LogoHair.svg",
  logoPng: "/LogoHair.png",
  ogImage: "/LogoHair.jpg",

  // Liens de navigation : seulement 4 onglets.
  // activeKey sert à savoir quel onglet allumer selon l'URL.
  navLinks: [
    { label: "Accueil", href: "/", activeKey: "" },
    { label: "Coiffures", href: "/skills/tout/coiffure", activeKey: "/coiffure" },
    { label: "Maquillage", href: "/skills/tout/makeup", activeKey: "/makeup" },
    { label: "À propos", href: "/about", activeKey: "/about" },
  ],

  // Réseaux sociaux : "id" est relié à une icône dans Footer/footer.js
  // MODIFIE : mets tes vrais liens
  socials: [
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
    { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/" },
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/2250700000000" },
  ],

  // Créneaux proposés dans le formulaire de réservation
  bookingSlots: [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00",
  ],
};
