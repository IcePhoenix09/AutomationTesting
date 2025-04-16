module.exports = {
    testEnvironment: "node",
    globals: {
      reporters: [
        "default",
        ["jest-html-reporters", { publicPath: ".html-report", filename: "e2e.html" }],
      ]
    },
  };