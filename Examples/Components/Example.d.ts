import { SvelteTypedComponent } from 'svelte-typed-component';
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
export default class Example extends SvelteTypedComponent<ExampleProps, ExampleEvents, ExampleSlots> {
}
declare const _ExampleProps: {
    t?: number;
    r?: any;
    a?: string;
    b?: string;
    c: number;
};
declare const _ExampleEvents: {
    click: MouseEvent;
};
declare const _ExampleSlots: {};
export declare type ExampleProps = typeof _ExampleProps;
export declare type ExampleEvents = typeof _ExampleEvents;
export declare type ExampleSlots = typeof _ExampleSlots;
export {};
