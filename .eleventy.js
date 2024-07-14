const pluginRev = require("eleventy-plugin-rev");
const eleventySass = require("eleventy-sass");

module.exports = function (eleventyConfig) {
  // eleventyConfig.addPlugin(pluginRev);
  eleventyConfig.addPlugin(eleventySass, {
    // rev: true
  });

  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false, // warning: don’t do this!
  });
};
