<script lang="ts">
  export let href: string | null = null;
  export let type: "button" | "submit" | "reset" | null = null;
  export let onClick: () => void | null = () => {};
  export let disabled: boolean = false;
  export let style: string | null = null;
</script>

{#if !href}
  <button
    on:click={disabled ? undefined : onClick}
    class={disabled ? "disabled" : ""}
    {...{ type, style }}
  >
    <slot />
  </button>
{:else}
  <a
    href={!disabled ? href : undefined}
    {style}
    class={disabled ? "disabled" : ""}
  >
    <slot />
  </a>
{/if}

<style>
  button,
  a {
    display: block;
    outline: 0;
    border: 0;
    font-size: 16px;
    text-decoration: none;
    font-family: var(--baseFontFamily);
    background-color: var(--primaryColor);
    color: var(--baseColor);
    cursor: pointer;
    border-radius: var(--baseBorderRadius);
    padding: 5px 30px;
    height: 44px;
    display: grid;
    place-items: center;
    box-sizing: border-box;
    transition: opacity 0.2s ease;

    &:hover,
    &:focus-visible {
      opacity: 0.85;
    }

    &.disabled {
      background: var(--baseAlt1Color);
      color: var(--txtDisabledColor);
      cursor: default;
    }
  }
</style>
