<script lang="ts">
  import { navigate } from "svelte-routing";
  import { loading, user } from "../stores/pocketbase";

  $: if (!$loading && $user === null) {
    navigate("/login");
  }
</script>

{#if $loading}
  <div>Checking if signed in...</div>
{:else}
  <slot />
{/if}
