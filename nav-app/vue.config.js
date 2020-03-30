const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 8083;

module.exports = {
  publicPath: `//localhost:${port}`,
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: true,
  devServer: {
    host: "0.0.0.0",
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    output: {
      library: "navapp",
      filename: "[name].[hash:8].js",
      libraryTarget: "umd",
      globalObject: "this"
    }
  }
};
