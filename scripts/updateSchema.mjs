import "zx/globals";

const apiSchemaEndpoint = "https://im-project.ddns.net/openapi.json";

await $`wget ${apiSchemaEndpoint} -O ./openapi.json`;
await $`npx openapi-typescript ./openapi.json -o ./types/schema.d.ts`;
await $`rm ./openapi.json`;
