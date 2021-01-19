import { SvelteComponentTyped } from 'svelte';
export default class Example3 extends SvelteComponentTyped<Example3Props, Example3Events, Example3Slots> {
    get x(): boolean;
}
declare const _Example3Props: {
    abc: "a" | "b" | "c";
    x?: true;
};
declare const _Example3Events: {
    [evt: string]: CustomEvent<any>;
};
declare const _Example3Slots: {};
export declare type Example3Props = typeof _Example3Props;
export declare type Example3Events = typeof _Example3Events;
export declare type Example3Slots = typeof _Example3Slots;
export {};
