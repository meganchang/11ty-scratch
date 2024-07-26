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

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "blog"].indexOf(tag) === -1);
	});

  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false, // warning: don’t do this!
  });
};
