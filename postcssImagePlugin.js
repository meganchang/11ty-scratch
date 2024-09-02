const plugin = (_opts) => {
    const Image = require("@11ty/eleventy-img")
  
    let options = {
      widths: [null],
      formats: ["webp", "jpg", "jpeg"],
    //   urlPath: `/assets/img/`,
      outputDir: `_site/img`
    }
  
    return {
      postcssPlugin: "postcss-image-plugin",
      Declaration: {
        "background-image": async (decl) => {
          if (decl.value.includes("image-url(")) {
            const imageFile = decl.value.match(/image-url\("(.+)"\)/)[1]
            let originalFormat;
            for (let format of options.formats) {
                if (imageFile.includes(format)) {
                    originalFormat = format;
                }
            }

            const metadata = await Image(`${imageFile}`, options)
            decl.value = `url(${metadata[originalFormat][0].url})`
          }
        },
      },
    }
  }
  
  plugin.postcss = true
  
  module.exports = plugin