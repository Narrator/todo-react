// @ts-check
const path = require("path");
const { cpSync, mkdirSync, writeFileSync } = require("fs");

mkdirSync(path.join(__dirname, "..", ".amplify-hosting", "static", "todo-react"), {
  recursive: true,
});
cpSync(
  path.join(__dirname, "..", "build"),
  path.join(__dirname, "..", ".amplify-hosting", "static", "todo-react"),
  {
    recursive: true,
  }
);

const deployManifest = {
  version: 1,
  framework: {
    name: "react",
    version: "18.2.0",
  },
  routes: [
    {
      path: "/*",
      target: {
        kind: "Static",
        cacheControl: "public, max-age=31536000, immutable",
      },
    },
  ],
};

writeFileSync(
  path.join(__dirname, "..", ".amplify-hosting", "deploy-manifest.json"),
  JSON.stringify(deployManifest)
);
