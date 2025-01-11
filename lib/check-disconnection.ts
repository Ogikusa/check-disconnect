import settings from "../settings.json" with { type: "json" }

type Status = "connected" | "disconnected" | "wating";

//TODO クロージャを入れる
let interfaceStatus: Status = "connected";
export function checkInterfaces(networkName: string) {
  const currentTime = new Date().toLocaleString("ja-JP");
  const networks = Deno.networkInterfaces();
  if (!networks.some((v) => v.name === networkName)) {
    if (interfaceStatus === "connected") {
      interfaceStatus = "disconnected";
      console.log(
        `➰ The network ${networkName} disconnected at ${currentTime} from network interfaces`
      );
    }
  } else {
    if (interfaceStatus === "disconnected") {
      console.log(`✓ Connected Again! It's ${currentTime}`);
      interfaceStatus = "wating";
    }
    if (interfaceStatus === "wating") {
      interfaceStatus = "connected";
    }
  }
}

const environment = Deno.build.os;
let internetStatus: Status = "connected";
export function checkInternetConnection() {
  const currentTime = new Date().toLocaleString("ja-JP");
  if (environment === "windows") {
    const pingCommand = new Deno.Command("ping", {
      args: ["8.8.8.8", "-n", "1", "-w", settings.delay.toString()],
    });
    const out = pingCommand.outputSync();
    if (out.code !== 0) {
      if (internetStatus === "connected") {
        console.log(`Can't access the Internet`);
        internetStatus = "disconnected";
      }
    } else {
      if (internetStatus === "wating") {
        internetStatus = "connected";
      }
      if (internetStatus === "disconnected") {
        console.log(`✓ Able to access the Internet again! It's ${currentTime}`);
        internetStatus = "wating";
      }
    }
  }
  //TODO: Support Linux and Darwin(Mac)
}
