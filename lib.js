const axios = require("axios");

module.exports = {
  getReleases,
};

async function getReleases(count = 10) {
  const feedUri = "https://xcodereleases.com/data.json";
  const res = await axios.get(feedUri);
  return res.data.slice(0, count).map((release) => {
    const d = release.date;
    release.date.date = new Date(d.year, d.month - 1, d.day);
    release.version.tag = Object.entries(release.version.release)
      .map(([name, label]) => `${name} ${label !== true ? label : ""}`.trim())
      .join("; ");
    release.toString = () => {
      const { name, requires } = release;
      const { build, number, tag } = release.version;
      const downloadUrl = release.links.download.url;
      const date = release.date.date.toLocaleDateString();
      return `[${date}] ${name} ${number} (${build}; ${tag}) -- Requires: ${requires}\n${downloadUrl}\n`;
    };
    return release;
  });
}
