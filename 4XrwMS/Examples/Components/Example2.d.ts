import { SvelteComponentTyped } from 'svelte';
export declare const abc = "abc";
export declare class abcabc {
    constructor();
}
export default class Example2 extends SvelteComponentTyped<Example2Props, Example2Events, Example2Slots> {
}
declare const _Example2Props: {
    c: any;
};
declare const _Example2Events: {
    click: any;
} & {
    [evt: string]: CustomEvent<any>;
};
declare const _Example2Slots: {};
export declare type Example2Props = typeof _Example2Props;
export declare type Example2Events = typeof _Example2Events;
export declare type Example2Slots = typeof _Example2Slots;
export {};
