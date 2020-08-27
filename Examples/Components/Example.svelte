<!--
 @component
 Here's some documentation for this component. It will show up on hover for
 JavaScript/TypeScript projects using a LSP-compatible editor such as VSCode or
 Vim/Neovim with coc.nvim.

 - You can use markdown here.
 - You can use code blocks here.
 - JSDoc/TSDoc will be respected by LSP-compatible editors.
 - Indentation will be respected as much as possible.
-->
<script> 
  import { TTT } from "../examplement";
  import Example3 from "../Example3.svelte";

  let x = "abc";
  
  export let t = 21;
  export let r = TTT(666);
  
  export let a = "abc";
  export let b = x;
  export let bol = false;
  export let tru=true
  /** abc */
  export let c : number;
  let u = c + 2;
  let rr="";
  $: u = u * t;
  $: rr = $$props.class;
</script>

<h1 on:click>{a}</h1>
<button class={b} on:click>{c}</button>
{r.join("v")}
<Example3 on:*>rr</Example3>
<div />
