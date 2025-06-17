module.exports = function(api) {
    api.cache(true);

    return {
        presets: [["babel-preset-expo", {
            jsxImportSource: "nativewind"
        }], "nativewind/babel"],

        plugins: [["module-resolver", {
            root: ["./app"],

            alias: {
                "@": "./app",
                "tailwind.config": "./tailwind.config.js"
            }
        }],
        ["module:react-native-dotenv", {
          moduleName: "@env",
          path: ".env",
        }]]
    };
};