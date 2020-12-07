<script lang="ts">
    import ExampleA from "./Components/Example.svelte";
    import {Example2} from "./Components";
    import {Example} from "./Components";
    export let abc: "a"|"b"|"c";
    export const x = true;

</script>

<h1>
    <ExampleA c></ExampleA>
    <Example2 c={0}>{abc}</Example2>
    <Example c={2}></Example>
    <abc-cde></abc-cde>
</h1>