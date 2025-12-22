module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  
  // Optimize for large sites
  eleventyConfig.setQuietMode(true);
  
  // Add filter to create internal links
  eleventyConfig.addFilter("linkTo", function(slug) {
    return `/pages/${slug}/`;
  });
  
  // Add filter to find page by slug
  eleventyConfig.addFilter("find", function(array, key, value) {
    return array.find(item => item[key] === value);
  });
  
  // Add filter to get related pages (random)
  eleventyConfig.addFilter("getRelated", function(allPages, currentSlug, limit = 6) {
    const filtered = allPages.filter(p => p.slug !== currentSlug);
    
    // Shuffle array using Fisher-Yates algorithm
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, limit);
  });
  
  // Add slice filter
  eleventyConfig.addFilter("slice", function(array, start, end) {
    return array.slice(start, end);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    ignores: ["README.md"]
  };
};
