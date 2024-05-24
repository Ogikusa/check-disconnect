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

let connectStatus: "connected" | "disconnected" | "wating" = "connected";
while (true) {
  const currentTime = new Date().toLocaleString("ja-JP");
  const networks = Deno.networkInterfaces();
  if (!networks.some((v) => v.name === selectedNetwork)) {
    if (connectStatus === "connected") {
      connectStatus = "disconnected";
      console.log(
        `🔥 The network ${selectedNetwork} disconnected at ${currentTime}`
      );
    }
  } else {
    if (connectStatus === "disconnected") {
      console.log(`✓ Connected Again! It's ${currentTime}`);
      connectStatus = "wating";
    }
    if (connectStatus === "wating") {
      connectStatus = "connected";
    }
  }
  await delay(50);
}
