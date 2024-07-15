const pluginRev = require("eleventy-plugin-rev");
const eleventySass = require("eleventy-sass");
const pluginImages = require("./.eleventy.images.js");

module.exports = function (eleventyConfig) {
  // App plugins
	eleventyConfig.addPlugin(pluginImages);
  // eleventyConfig.addPlugin(pluginRev);
  eleventyConfig.addPlugin(eleventySass, {
    // rev: true
  });

  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false, // warning: don’t do this!
  });
};
