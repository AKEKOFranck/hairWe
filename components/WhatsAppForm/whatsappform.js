"use client";
// =====================================================================
// FORMULAIRE DE RÉSERVATION -> envoie un message prérempli sur WhatsApp
// "use client" obligatoire : état du formulaire, événements, useSearchParams
// =====================================================================
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { LuUser, LuPhone, LuMapPin, LuCalendarDays, LuClock, LuCheck } from "react-icons/lu";
import { siteConfig } from "@/lib/siteConfig";
import { getAllprestation, formatPrice } from "@/lib/prestation";
import styles from "./whatsappform.module.css";

// Les deux choix du bouton "autres commandes"
const orderModes = [
  { id: "seule", label: "Uniquement cette prestation" },
  { id: "autres", label: "J'ai d'autres prestation" },
];

// Description des champs "infos cliente" (rendus avec un map)
// MODIFIE les libellés ou placeholders si besoin
const contactFields = [
  { name: "nom", label: "Nom", icon: LuUser, type: "text", autoComplete: "family-name", placeholder: "Kouassi" },
  { name: "prenom", label: "Prénom", icon: LuUser, type: "text", autoComplete: "given-name", placeholder: "Aya" },
  { name: "telephone", label: "Numéro WhatsApp", icon: LuPhone, type: "tel", autoComplete: "tel", placeholder: "07 00 00 00 00", pattern: "[0-9+\\s]{8,16}", title: "Entre un numéro valide (8 à 16 chiffres)" },
  { name: "localisation", label: "Localisation (commune / quartier)", icon: LuMapPin, type: "text", autoComplete: "address-level2", placeholder: "Cocody Angré, Yopougon, Marcory..." },
];

export default function WhatsAppForm() {
  const searchParams = useSearchParams();
  const allServices = useMemo(() => getAllprestation(), []);

  // Prestation préchoisie via le bouton "Réserver" : /reservation?type=coiffure&service=box-braids
  const initialKey =
    searchParams.get("type") && searchParams.get("service")
      ? `${searchParams.get("type")}:${searchParams.get("service")}`
      : "";

  const [form, setForm] = useState({
    nom: "", prenom: "", telephone: "", localisation: "",
    date: "", heure: "", notes: "",
  });
  const [mainService, setMainService] = useState(
    allServices.some((s) => s.key === initialKey) ? initialKey : ""
  );
  const [orderMode, setOrderMode] = useState("seule");
  const [extraServices, setExtraServices] = useState([]); // clés des autres prestation cochées
  const [today, setToday] = useState("");

  // Date minimale = aujourd'hui (calculée côté navigateur pour éviter un décalage serveur)
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleExtra = (key) =>
    setExtraServices((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  // Choisir "seule" vide les prestation supplémentaires
  const changeOrderMode = (mode) => {
    setOrderMode(mode);
    if (mode === "seule") setExtraServices([]);
  };

  const findService = (key) => allServices.find((s) => s.key === key);
  const selected = [mainService, ...extraServices].filter(Boolean).map(findService);
  const total = selected.reduce((sum, s) => sum + s.prix, 0);

  // Regroupe les prestation par type pour les <optgroup> et la liste de cases
  const groups = useMemo(
    () =>
      ["coiffure", "makeup"].map((type) => ({
        type,
        label: allServices.find((s) => s.type === type)?.typeLabel,
        items: allServices.filter((s) => s.type === type),
      })),
    [allServices]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mainService) return;

    const dateText = new Date(`${form.date}T00:00:00`).toLocaleDateString("fr-FR", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    // ---- Message qui sera envoyé sur WhatsApp ----
    // MODIFIE le texte si tu veux une autre formulation
    const lines = [
      `Bonjour ${siteConfig.name}, je souhaite réserver :`,
      "",
      ...selected.map((s) => `- ${s.nom} (à partir de ${formatPrice(s.prix)})`),
      `Total estimé : ${formatPrice(total)}`,
      orderMode === "seule" ? "Uniquement cette prestation." : "J'ai d'autres prestation à prendre.",
      "",
      `Date : ${dateText}`,
      `Heure : ${form.heure}`,
      "",
      `Nom : ${form.nom}`,
      `Prénom : ${form.prenom}`,
      `Téléphone : ${form.telephone}`,
      `Localisation : ${form.localisation}`,
      form.notes ? `Précisions : ${form.notes}` : "",
    ].filter((line, i, arr) => !(line === "" && arr[i - 1] === ""));

    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* ---------- 1. Prestation ---------- */}
      <fieldset className={styles.block}>
        <legend>Ta prestation</legend>

        <label className={styles.field}>
          <span className={styles.label}>Prestation choisie</span>
          <select
            required
            value={mainService}
            onChange={(e) => setMainService(e.target.value)}
            className={styles.input}
          >
            <option value="" disabled>Choisis une prestation</option>
            {groups.map((group) => (
              <optgroup key={group.type} label={group.label}>
                {group.items.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.nom} - à partir de {formatPrice(s.prix)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        {/* Bouton : seulement cette prestation OU d'autres commandes */}
        <div className={styles.field}>
          <span className={styles.label}>As-tu d'autres prestation à prendre ?</span>
          <div className={styles.toggle} role="group" aria-label="Autres prestation">
            {orderModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                aria-pressed={orderMode === mode.id}
                className={`${styles.toggleBtn} ${orderMode === mode.id ? styles.toggleActive : ""}`}
                onClick={() => changeOrderMode(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des autres prestation (affichée seulement si "autres") */}
        {orderMode === "autres" && (
          <div className={styles.extras}>
            {groups.map((group) => (
              <div key={group.type}>
                <p className={styles.groupTitle}>{group.label}</p>
                <ul className={styles.checkList}>
                  {group.items
                    .filter((s) => s.key !== mainService)
                    .map((s) => (
                      <li key={s.key}>
                        <label className={`${styles.check} ${extraServices.includes(s.key) ? styles.checkOn : ""}`}>
                          <input
                            type="checkbox"
                            checked={extraServices.includes(s.key)}
                            onChange={() => toggleExtra(s.key)}
                          />
                          <span className={styles.checkBox} aria-hidden="true">
                            {extraServices.includes(s.key) && <LuCheck size={14} />}
                          </span>
                          <span className={styles.checkText}>
                            {s.nom}
                            <small>{formatPrice(s.prix)}</small>
                          </span>
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </fieldset>

      {/* ---------- 2. Date et heure ---------- */}
      <fieldset className={styles.block}>
        <legend>Date et heure</legend>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.label}><LuCalendarDays aria-hidden="true" /> Date souhaitée</span>
            <input
              type="date"
              name="date"
              required
              min={today}
              value={form.date}
              onChange={handleChange}
              className={styles.input}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}><LuClock aria-hidden="true" /> Heure</span>
            <select
              name="heure"
              required
              value={form.heure}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="" disabled>Choisis une heure</option>
              {siteConfig.bookingSlots.map((slot) => (
                <option key={slot} value={slot}>{slot.replace(":", "h")}</option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      {/* ---------- 3. Infos de la cliente ---------- */}
      <fieldset className={styles.block}>
        <legend>Tes informations</legend>
        <div className={styles.row}>
          {contactFields.map((field) => {
            const Icon = field.icon;
            return (
              <label key={field.name} className={styles.field}>
                <span className={styles.label}><Icon aria-hidden="true" /> {field.label}</span>
                <input
                  type={field.type}
                  name={field.name}
                  required
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  pattern={field.pattern}
                  title={field.title}
                  value={form[field.name]}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
            );
          })}
        </div>

        <label className={styles.field}>
          <span className={styles.label}>Précisions (facultatif)</span>
          <textarea
            name="notes"
            rows={3}
            placeholder="Taille des tresses, couleur de mèches, référence photo..."
            value={form.notes}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
      </fieldset>

      {/* ---------- Récapitulatif + envoi ---------- */}
      <div className={styles.summary}>
        <div>
          <p className={styles.summaryLabel}>Total estimé</p>
          <p className={styles.summaryTotal}>{selected.length ? formatPrice(total) : "-"}</p>
          <p className={styles.summaryNote}>Prix indicatif, confirmé par WhatsApp selon ta demande.</p>
        </div>
        <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={!mainService}>
          <FaWhatsapp size={20} aria-hidden="true" /> Envoyer sur WhatsApp
        </button>
      </div>
    </form>
  );
}
