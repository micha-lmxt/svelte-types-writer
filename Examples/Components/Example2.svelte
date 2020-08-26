<script context="module">
  export const abc = "abc";
  export class abcabc {
    constructor(){

    }
  }
</script>
<script >
    import Example from "Example.svelte";
    
    export let c;
    
  </script>
  
  <Example on:click>{c}</Example>
