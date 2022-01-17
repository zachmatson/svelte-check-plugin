const { spawn } = require("child_process");

class SvelteCheckPlugin {
  constructor() {}

  apply(compiler) {
    const pluginName = SvelteCheckPlugin.name;

    compiler.hooks.make.tapAsync(pluginName, (compilation, callback) => {
      const isWindows = process.platform == "win32";
      const command = isWindows ? "svelte-check.cmd" : "svelte-check";
      let proc = spawn(command, { stdio: "pipe", shell: isWindows });

      let output = "";
      const onData = (data) => {
        output += data;
      };
      proc.stdout.on("data", onData);
      proc.stderr.on("data", onData);

      const onClose = (code) => {
        if (code == 0) {
          console.log(output);
        } else {
          compilation.errors.push("svelte-check failed");
          if (output) {
            compilation.errors.push(output);
          }
        }
        callback();
      };
      const onError = (error) => {
        compilation.errors.push(
          "svelte-check-plugin failed to run svelte-check"
        );
        console.log(error);
      };

      proc.on("close", onClose);
      proc.on("error", onError);
    });
  }
}

module.exports = SvelteCheckPlugin;
