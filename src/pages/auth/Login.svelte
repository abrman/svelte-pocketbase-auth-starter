<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import logo from "../../assets/logo_svg.svelte";
  import Button from "../../components/form/Button.svelte";
  import Text from "../../components/form/Text.svelte";
  import { signin, user } from "../../stores/pocketbase";

  $: if ($user) navigate("/");

  let errors: { [key: string]: string | null } = {};

  let form = {
    email: history?.state?.email || "",
    password: history?.state?.password || "",
  };

  const login = async (e: SubmitEvent) => {
    e.preventDefault();

    const signinResponse = await signin(form.email, form.password);
    if (signinResponse.success) {
      navigate("/");
    } else {
      const isServerReachable = signinResponse?.response?.status !== 0;
      const errorResponse: typeof errors = {};

      errorResponse.general = signinResponse?.response?.data.message;
      if (!errorResponse.general && !isServerReachable)
        errorResponse.general = "Authentication server is not reachable.";

      Object.keys(signinResponse?.response?.data?.data).forEach((key) => {
        errorResponse[key] =
          signinResponse?.response?.data?.data?.[key].message;
      });

      errors = errorResponse;
    }
  };
</script>

<div class="wrapper">
  <svelte:component this={logo} />
  <form on:submit={login}>
    <Text
      type="email"
      label="Email"
      bind:value={form.email}
      error={errors.email}
      required
      autofocus
    />
    <Text
      type="password"
      label="Password"
      bind:value={form.password}
      error={errors.password}
      required
    />
    <Button type="submit">Log in</Button>
    {#if errors.general}
      <div class="error-message">{errors.general}</div>
    {/if}

    <p>
      Don't have an account yet? <Link to="/signup" state={{ ...form }}
        >Sign up.</Link
      >.
    </p>
  </form>
</div>

<style>
  .wrapper {
    width: min(420px, 90vw);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 40px;

    & svg {
      margin: 0 auto;
    }
    & form {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 16px;

      & > .error-message {
        margin: -5px 5px 0;
        font-size: 14px;
        color: var(--dangerColor);
        text-align: left;
      }
    }
  }
</style>
