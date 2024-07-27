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
		return (tags || []).filter(tag => ["all", "blog", "categories"].indexOf(tag) === -1);
	});

  eleventyConfig.addFilter('tagFilter', function(collection, tag) {
    if (!tag) return collection;
      const filtered = collection.filter(item => item.data.tags.includes(tag))
      return filtered;
  });

  // Return all the categories
	// eleventyConfig.addFilter("getAllCategories", collection => {
	// 	let categorySet = new Set();
  //   console.log(collection.length);
	// 	for(let item of collection) {
  //     if (item.data.category) {
  //       console.log(`${item.data.title} ${item.data.category}`);
  //       categorySet.add(item.data.category);
  //     }
	// 	}
  //   console.log(categorySet);
	// 	return Array.from(categorySet);
	// });

    // Return all the categories
	eleventyConfig.addCollection("categories", collection => {
		let categorySet = new Set();
    console.log("-----------------------------")
		for(let item of collection.items) {
      if (item.data.category) {
        console.log(`${item.data.title} ${item.data.category}`);
        categorySet.add(item.data.category);
      }
		}
    console.log(categorySet);
		return Array.from(categorySet);
	});

  eleventyConfig.addFilter('categoryFilter', function(collection, category) {
    if (!category) return collection;
      const filtered = collection.filter(item => item.data.category == category)
      return filtered;
  });

	// eleventyConfig.addFilter("filterCategoryList", function filterCategoriesList(categories) {
	// 	return (categories || []).filter(category => ["all", "blog"].indexOf(category) === -1);
	// });

  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false, // warning: don’t do this!
  });
};
