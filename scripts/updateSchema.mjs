import "zx/globals";

const apiSchemaEndpoint = "http://140.112.107.148:8000/openapi.json";

await $`wget  ${apiSchemaEndpoint} --directory-prefix=./temp`;
await $`npx openapi-typescript ./temp/openapi.json -o ./types/schema.d.ts`;
await $`rm -rf ./temp`;
