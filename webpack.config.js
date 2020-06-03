const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest")
const path = require("path");

const config = {
    entry: "./public/assets/js/index.js",
    output: {
      path: __dirname + "/public/assets/dist/",
      filename: "bundle.js"
    },
    mode: "production",
    plugins: [
        new MiniCssExtractPlugin({
        filename: "style.css"}),
        new WebpackPwaManifest({
            filename: "manifest.json",
            fingerprints: false,
            name: "Budget Tracker",
            short_name: "Budget",
            description: "Budget Tracker application",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            start_url: "/",
            display: "standalone",
            crossorigin: "use-credentials", 
            icons: [
              {
                src: path.resolve("public/assets/images/icons/icon-512x512.png"),
                size: [192, 512]
              },
            ]
          })
    ],
    module: {
    rules: [
      {
        test: /\.s$/, // files must end in ".js" to be transpiled
        exclude: /node_modules/, // don't transpile code from "node_modules"
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/i, // files must end in ".js" to be transpiled
        exclude: /node_modules/, // don't transpile code from "node_modules"
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  }
  };
  
module.exports = config;
  