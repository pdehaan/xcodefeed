const axios = require("axios");

module.exports = {
  getReleases,
};

async function getReleases(count = 10, channels = "") {
  const feedUri = "https://xcodereleases.com/data.json";
  const res = await axios.get(feedUri);
  if (channels.length) {
    // Convert the [comma separated] `channels` string into an array.
    channels = channels.split(",");
    // Overwrite res.data with a filtered array of the specified channel releases.
    res.data = res.data.filter(release => Object.keys(release.version.release).some(ch => channels.includes(ch)));
  }
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
