// =====================================================================
// OUTILS POUR LIRE LES DONNÉES JSON
// Fichiers : lib/data/hair.json et lib/data/makeup.json
// =====================================================================

import hair from "./data/hair.json";
import makeup from "./data/makeup.json";

const sources = {
  coiffure: hair,
  makeup: makeup,
};

function getSource(type) {
  const source = sources[type];
  if (!source) {
    throw new Error(
      `Type "${type}" inconnu. Types disponibles : ${Object.keys(sources).join(", ")}`
    );
  }
  return source;
}

// Collection complète (label, devise, note, categories, prestation)
export function getCollection(type) {
  return getSource(type);
}

// Catégories + le filtre "Toutes"
export function getCategories(type) {
  const source = getSource(type);
  return [{ slug: "tout", label: "Toutes" }, ...(source.categories ?? [])];
}

// Prestations filtrées. "tout" renvoie tout.
export function getprestation(type, categorie = "tout") {
  const prestations = getSource(type).prestation ?? [];
  if (!categorie || categorie === "tout") return prestations;
  return prestations.filter((p) => p.categorie === categorie);
}

// Prestations populaires
export function getPopulaires(type, limit = 3) {
  return (getSource(type).prestation ?? [])
    .filter((p) => p.populaire)
    .slice(0, limit);
}

// Toutes les prestations : coiffure + makeup
export function getAllprestation() {
  return Object.entries(sources).flatMap(([type, collection]) =>
    (collection.prestation ?? []).map((p) => ({
      ...p,
      type,
      typeLabel: collection.label,
      key: `${type}:${p.id}`,
    }))
  );
}

// 20000 devient "20 000 FCFA"
export function formatPrice(amount, devise = "FCFA") {
  const spaced = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  return `${spaced}\u00A0${devise}`;
}