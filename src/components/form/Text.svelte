<script lang="ts">
  export let type: "text" | "email" | "password";
  export let label: string = "Label";
  export let value: string = "";
  export let disabled: boolean = false;
  export let error: string | null = null;
  export let placeholder: string = "";
  export let layout: "vertical" | "horizontal" = "vertical";
  export let autofocus: boolean = false;
  export let required: boolean = false;
  export let autocomplete: "on" | "off" = "off";
</script>

<div class={`input-wrapper layout-${layout}`}>
  <label class={`input-block layout-${layout}`}>
    <div>
      {label}
      {#if required}<span class="required">*</span>{/if}
    </div>
    <input
      bind:value
      {...{
        placeholder,
        type,
        required,
        autocomplete,
        disabled,
        ...(autofocus ? { autofocus } : {}),
      }}
    />
  </label>
  {#if error}<div class="error-message">{error}</div>{/if}
</div>

<style>
  .input-wrapper {
    text-align: left;

    & .error-message {
      margin: 5px 5px 0;
      font-size: 14px;
      color: var(--dangerColor);
    }

    & .input-block {
      border-radius: var(--baseBorderRadius);
      background: var(--baseAlt1Color);
      cursor: text;

      &:focus-within {
        background: var(--baseAlt2Color);
      }

      &.layout-vertical {
        display: flex;
        padding: 6px 15px 10px;
        flex-direction: column;
        gap: 4px;
      }
      &.layout-horizontal {
        display: grid;
        grid-template-columns: 1fr 2fr;
        flex-direction: row;
        gap: 4px;
      }

      & input {
        background: none;
        border: none;
        outline: none;
        font-size: 14px;
      }

      font-size: 14px;
      & .required {
        color: #cd4318;
      }
    }
  }
</style>
