import { defineConfig } from "tinacms";

export default defineConfig({
  // clientId: process.env.TINA_PUBLIC_CLIENT_ID || "",
  // token: process.env.TINA_TOKEN || "",
  // branch: "master",
  build: {
    outputFolder: "admin",   // cartella generata per l’UI di Tina
    publicFolder: "public",  // cartella degli asset pubblici
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "md",
        fields: [
          /* ─── Flag e metadati (boolean di default = false/assente) ────────── */
          {
            type: "boolean",
            name: "published",
            label: "Published",
            description:
              "Imposta su true quando il post è pronto per andare online.",
          },
          {
            type: "boolean",
            name: "updated",
            label: "Updated",
            description:
              "Metti true solo se la modifica è significativa (mostrerà la data di aggiornamento).",
          },
          {
            type: "boolean",
            name: "pinned",
            label: "Pinned",
            description: "Evidenzia il post nella home.",
          },
          {
            type: "string",
            name: "updateReason",
            label: "Update Reason",
            description: "Breve motivo dell’aggiornamento (opzionale).",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: ["Categoria 1", "Categoria 2", "Categoria 3", "Categoria 4"],
          },

          /* ─── Contenuto principale ───────────────────────────────────────── */
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            description:
              "Lascia vuoto per generarlo automaticamente dal titolo (o personalizzalo).",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },

          /* ─── SEO (opzionale) ───────────────────────────────────────────── */
          {
            type: "string",
            name: "seo",
            label: "SEO",
            description: "Meta description o altri dati SEO (opzionale).",
          },
        ],
      },
    ],
  },
});