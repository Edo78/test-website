const { DateTime } = require("luxon");

module.exports = function (config) {
    /* --- filtro Nunjucks "date" --- */
    config.addNunjucksFilter("date", (value, fmt = "dd LLL yyyy") => {
        if (!value) return "";
        let dt =
          value instanceof Date
            ? DateTime.fromJSDate(value)
            : DateTime.fromISO(String(value));
        if (!dt.isValid) dt = DateTime.fromJSDate(new Date());
        return dt.toFormat(fmt);
      });

    config.addPassthroughCopy("public");
    // admin pass‑through
    config.addPassthroughCopy("admin");
  
    // Collezione categorie (per header e pagine dedicate)
    config.addCollection("category", (api) =>
        api.getFilteredByGlob("content/categories/*.md")
    );

    // collezione ordinata: pinned più recente al primo posto, poi tutti gli altri per data
    config.addCollection("posts", (api) => {
      const published = api
        .getFilteredByGlob("content/posts/*.md")
        .filter((p) => p.data.published);
  
      const pinned = published
        .filter((p) => p.data.pinned)
        .sort((a, b) => new Date(b.data.publishedAt) - new Date(a.data.publishedAt));
  
      const firstPinned = pinned.length ? [pinned[0]] : [];
      const rest = published
        .filter((p) => !p.data.pinned || p.inputPath !== firstPinned[0]?.inputPath)
        .sort((a, b) => new Date(b.data.publishedAt) - new Date(a.data.publishedAt));
  
      return [...firstPinned, ...rest];
    });
  
    return {
        dir: {
          input: "content",
          includes: "../_includes", // cartella layout alla root
          output: "_site",
        },
    };
  };
  