import { checkInterfaces, checkInternetConnection } from "./lib/check-disconnection.ts";
import { delay } from "./lib/delay.ts";
import select from "./lib/select.ts";

const networksInLauching = Array.from(
  new Set(Deno.networkInterfaces().map((v) => v.name))
);
console.log("Choosing Network:");
console.log(
  "If you can't see the network you want to watch, please connect the network before launching this application"
);
const selectedNetwork = await select(networksInLauching);

console.log(`👀 Watching your network: ${selectedNetwork} `);

while (true) {
  checkInterfaces(selectedNetwork);
  checkInternetConnection()
  await delay(1000);
}
