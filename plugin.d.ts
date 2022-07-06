declare module "svelte-check-plugin" {
  import { Compiler } from "@types/webpack";

  interface SvelteCheckPluginOptions {
    args?: string[];
  }

  class SvelteCheckPlugin {
    constructor(args?: SvelteCheckPluginOptions);
    apply(compiler: Compiler): void;
  }

  export { SvelteCheckPlugin, SvelteCheckPluginOptions };
  export default SvelteCheckPlugin;
  export = SvelteCheckPlugin;
}
