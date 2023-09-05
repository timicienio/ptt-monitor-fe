import "zx/globals";

const apiSchemaEndpoint = "https://im-project.ddns.net/openapi.json";

await $`wget  ${apiSchemaEndpoint} --directory-prefix=./temp`;
await $`npx openapi-typescript ./temp/openapi.json -o ./types/schema.d.ts`;
await $`rm -rf ./temp`;
