const { spawn } = require("child_process");

class SvelteCheckPlugin {
  constructor() {
    this.error = null;
    this.output = null;
  }

  apply(compiler) {
    const pluginName = SvelteCheckPlugin.name;
    compiler.hooks.beforeCompile.tapAsync(pluginName, (_params, callback) => {
      this.error = false;
      this.output = "";

      let svelteCheckPromise = new Promise((resolve, reject) => {
        let proc = spawn("npx", ["svelte-check"], { stdio: "pipe" });

        proc.stdout.on("data", (data) => {
          this.output += data;
        });
        proc.stderr.on("data", (data) => {
          this.output += data;
        });

        proc.on("close", (code) => (code == 0 ? resolve() : reject()));
        proc.on("error", reject);
      });

      svelteCheckPromise.then(callback).catch(() => {
        this.error = true;
        callback();
      });
    });

    compiler.hooks.thisCompilation.tap(pluginName, (compilation, _params) => {
      if (this.error) {
        compilation.errors.push("svelte-check failed");
        compilation.errors.push(this.output);
      } else {
        console.log(this.output);
      }
    });
  }
}

module.exports = SvelteCheckPlugin;
