# svelte-types-writer
A helper script to get you started with writing typescript declaration files for svelte apps. 
It creates typescript .d.ts based on svelte2tsx, which is used by the official vs code svelte plugin

### Usage

Easiest usage is with npx 
```bash
npx svelte-types-writer
```

to process the files directly you could run 
```bash
node /svelte-types-writer/dist/index.js ./src/**/*.svelte --libs ./src/**/*.ts ./src/**/*.js
```

See end of file if you want to install local.


### Options
 --out <folder>: Set an output folder for the type declarations.
 --override: if existing types and js files should be overridden.
 --no-js: if set no forwarding javascript files are generated, next section "Typing Strategy".
 --debug: for debugging only.

### Typing Strategy

A preferred solution would be to directly type the *.svelte file by adding a *.svelte.d.ts file with default export. Unfortunately that does not play well with vs code intellisense. While in normal .ts/.js files the types from the .svelte.d.ts files are used, in other .svelte files it does not seem to work (8/26/2020).


What seems to work is the following:
1. by file:
    Let's say we want to have types for Example.svelte. svelte-types-writer would generate Example.d.ts in the same folder. What we then need is file Example.js in the same folder with the following content:
```javascript
// ./Example.js
import Example from './Example.svelte';
export default Example;
```
    now we can access the svelte component from other files by using 
```javascript
// ./Test.svelte
<script>
    import Example from './Example';
</script>
<Example></Example>
```

2. by folder:
    Let's say we have a subfolder "./Component" with the following files:
     ./Component |
    -------------|
    Example1.svelte |
    Example2.svelte |
    Example1.d.ts |
    Example2.d.ts |

    we can add two files index.js:
```javascript
// ./Component/index.js
import Example1 from 'Example1.svelte';
import Example2 from 'Example2.svelte';
export {Example1, Example2};
```  
    and index.d.ts:
```javascript
// ./Component/index.d.ts
import Example1 from 'Example1';
import Example2 from 'Example2';
export {Example1, Example2};
```     
    then we can access the typed components eg.like that
```javascript
// ./App.ts or ./App.js
import {Example1} from './Component';

const app = new Example1(...);
```
    or 
```javascript
// ./App.svelte
<script>
    import {Example2} from './Component';
</script>
<Example2 ...></Example2>
```
By default svelte-types-writer adds .js files Example1.js & Example2.js like above. You can turn this off with the --no-js option.

### Typing and Commenting

Good written type declarations help the users to quickly use your library or module. General tips for writing .d.ts files can be found [here](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html). For now(8/26/2020) it seems most important to focus on the props of your component. Events and Slots are also generated, but by now they don't seem to show up in vs code intellisens. Vs code intellisense can show comments, which are formatted like this: 
```javascript
// Example.d.ts
import { SvelteTypedComponent } from 'svelte-typed-component';
/**
Put general information about the component here
 */
export default class Example extends SvelteTypedComponent<ExampleProps, ExampleEvents, ExampleSlots> {
}
declare const _ExampleProps: {
    /** Add information for certain props here*/
    t?: number;
    /** Add information for certain props here*/
    r?: any;
    /** Add information for certain props here*/
    a?: string;
    b?: string;
    c: number;
};
...
```


------------------------------------



#### Alternative usage with local installation

```javascript
npm install --save-dev svelte-types-writer
```
Then you can run:
```javascript
node /svelte-types-writer/dist/index.js ./src/**/*.svelte --libs ./src/**/*.ts ./src/**/*.js
```
Declaration files are written directly next to the .svelte files. If you prefer to have them in an extra folder, use the --out option:
```javascript
node /svelte-types-writer/dist/index.js ./**/*.svelte --libs ./**/*.ts ./**/*.js --out ./types
```

Then you have first class type definitions? No. You now basically got the output of what svelte2tsx generates to make svelte types intellisense-usable for vs code and other editors in a convenient format. See next chapter "Typing Strategy" on how to use the .d.ts files. See "Intellisense" to learn, how to add comments.

#### Removing and Dependencies for Alternative usage

Note: the dependency to svelte-typed-component was removed with version 1.0.2 since svelte now exposes the type SvelteComponentTyped. So the following only applies to prior versions:
After using svelte-types-writer you can uninstall the package and all its dependencies with one exception. Make sure to keep a dependency to svelte-typed-component, since all generated declaration files depend on it. 
```javascript
npm install svelte-typed-component
```


---

#### For more information see [this blog post.](https://gradientdescent.de/Svelte-And-Typescript/)



