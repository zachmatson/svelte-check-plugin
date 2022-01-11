import { Compiler } from "webpack";

export default class SvelteCheckPlugin {
  constructor();
  apply(compiler: Compiler): void;
}

declare module "svelte-check-plugin" {
  export { SvelteCheckPlugin };
  export default SvelteCheckPlugin;
  export = SvelteCheckPlugin;
}
