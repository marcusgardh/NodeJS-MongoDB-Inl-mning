const path = require("path");

module.exports = {
    mode: "development",
    target: "node",
    entry: "main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "./public"
    }
}