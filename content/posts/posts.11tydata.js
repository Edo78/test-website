const { execSync } = require("node:child_process");

function gitCreated(path) {
  try {
    const out = execSync(
      `git log --follow --diff-filter=A --format=%aI -- "${path}"`,
      { encoding: "utf8" }
    ).trim();
    if (!out) return undefined;               // file non in git
    const lines = out.split("\n");
    return new Date(lines[lines.length - 1]); // commit più vecchia
  } catch {
    return undefined;                         // repo non inizializzato, ecc.
  }
}

module.exports = {
  layout: "post.njk",

  eleventyComputed: {
    /* data “fissa” di pubblicazione */
    publishedAt: data =>
      data.published
        ? gitCreated(data.page.inputPath) || data.page.date
        : undefined,

    updatedAt: data =>
      data.published && data.updated
        ? new Date(
            execSync(
              `git log -1 --format=%aI -- "${data.page.inputPath}"`,
              { encoding: "utf8" }
            ).trim()
          )
        : undefined,

    permalink: data =>
      data.published ? `/posts/${data.slug || data.page.fileSlug}/` : false,
  },
};
