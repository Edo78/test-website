module.exports = {
    layout: "post.njk",
  
    eleventyComputed: {
      /* 1. pubblicato? allora publishedAt = page.date (Date già valido) */
      publishedAt: data => (data.published ? data.page.date : undefined),
  
      /* 2. updatedAt solo se updated = true (stringa speciale OK) */
      updatedAt: data =>
        data.published && data.updated ? "git Last Modified" : undefined,
  
      /* 3. draft: niente output */
      permalink: data =>
        data.published
          ? `/posts/${data.slug || data.page.fileSlug}/`
          : false,
    },
  };
  