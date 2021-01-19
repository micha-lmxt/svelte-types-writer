import {SvelteComponentTyped} from 'svelte'
///<reference types="svelte" />
<></>;
import ExampleA from "./Components/Example.svelte";
import {Example2} from "./Components";
import {Example} from "./Components";
function render() {

    
    
    
     let abc: "a"|"b"|"c";
     const x = true;

;
() => (<>

<h1>
    <ExampleA c></ExampleA>
    <Example2 c={0}>{abc}</Example2>
    <Example c={2}></Example>
    <abc-cde></abc-cde>
</h1></>);
return { props: {abc: abc , x: x} as {abc: "a"|"b"|"c", x?: typeof x}, slots: {}, getters: {x: x}, events: {} }}

export default class Example3 extends SvelteComponentTyped<Example3Props,Example3Events,Example3Slots>{
    get x() { return render().getters.x }
};
const r = (__sveltets_with_any_event(render)) ();
const _Example3Props = r.props;
const _Example3Events = r.events;
const _Example3Slots = r.slots;
export type Example3Props = typeof _Example3Props;
export type Example3Events = typeof _Example3Events;
export type Example3Slots = typeof _Example3Slots;
