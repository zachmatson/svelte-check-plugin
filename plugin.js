const { spawn } = require("child_process");

class SvelteCheckPlugin {
  constructor() {}

  apply(compiler) {
    const pluginName = SvelteCheckPlugin.name;

    compiler.hooks.make.tapAsync(pluginName, (compilation, callback) => {
      let proc = spawn("svelte-check", { stdio: "pipe" });

      let output = "";
      const onData = (data) => {
        output += data;
      };
      proc.stdout.on("data", onData);
      proc.stderr.on("data", onData);

      const onError = () => {
        compilation.errors.push("svelte-check failed");
        compilation.errors.push(output);
        callback();
      };
      const onSuccess = () => {
        console.log(output);
        callback();
      };

      proc.on("close", (code) => (code == 0 ? onSuccess() : onError()));
      proc.on("error", onError);
    });
  }
}

module.exports = SvelteCheckPlugin;
