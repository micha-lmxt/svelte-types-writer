import {SvelteComponentTyped} from 'svelte'
///<reference types="svelte" />
<></>;
import { TTT } from "../examplement";
import Example3 from "../Example3.svelte";
function render() { let $$props = __sveltets_allPropsType();
 
  
  

  let x = "abc";
  
   let t = 21;
   let r = TTT(666);
  
   let a = "abc";
   let b = x;
   let bol = false;bol = __sveltets_any(bol);;
   let tru=true;tru = __sveltets_any(tru);
  /** abc */
   let c : number;
  let u = c + 2;
  let rr="";
  $: u = __sveltets_invalidate(() => u * t);
  $: rr = __sveltets_invalidate(() => $$props.class);
;
() => (<>


<h1 onclick={undefined}>{a}</h1>
<button class={b} onclick={undefined}>{c}</button>
{r.join("v")}
<Example3 >rr</Example3>
<div />
</>);
return { props: {t: t , r: r , a: a , b: b , bol: bol , tru: tru , c: c} as {t?: typeof t, r?: typeof r, a?: typeof a, b?: typeof b, bol?: typeof bol, tru?: typeof tru, 
/** abc */c: number}, slots: {}, getters: {}, events: {'click':__sveltets_mapElementEvent('click'), '*':__sveltets_bubbleEventDef(__sveltets_instanceOf(Example3).$$events_def, '*')} }}

/**
 * Here's some documentation for this component. It will show up on hover for
 * JavaScript/TypeScript projects using a LSP-compatible editor such as VSCode or
 * Vim/Neovim with coc.nvim.
 *
 * - You can use markdown here.
 * - You can use code blocks here.
 * - JSDoc/TSDoc will be respected by LSP-compatible editors.
 * - Indentation will be respected as much as possible.
 */
export default class Example extends SvelteComponentTyped<ExampleProps,ExampleEvents,ExampleSlots>{
};
const r = (__sveltets_with_any(__sveltets_with_any_event(render))) ();
const _ExampleProps = r.props;
const _ExampleEvents = r.events;
const _ExampleSlots = r.slots;
export type ExampleProps = typeof _ExampleProps;
export type ExampleEvents = typeof _ExampleEvents;
export type ExampleSlots = typeof _ExampleSlots;
