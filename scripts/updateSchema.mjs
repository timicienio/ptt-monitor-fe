import "zx/globals";

const apiSchemaEndpoint = "https://im-project.onrender.com/openapi.json";

await $`wget  ${apiSchemaEndpoint} -O ./temp/openapi.json`;
await $`npx openapi-typescript ./temp/openapi.json -o ./types/schema.d.ts`;
await $`rm -rf ./temp`;
