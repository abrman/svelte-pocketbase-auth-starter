<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import logo from "../../assets/logo_svg.svelte";
  import Button from "../../components/form/Button.svelte";
  import Text from "../../components/form/Text.svelte";
  import { user, signup } from "../../stores/pocketbase";

  $: if ($user) navigate("/");

  let errors: { [key: string]: string | null } = {};

  let form = {
    email: history?.state?.email || "",
    password: history?.state?.password || "",
    name: history?.state?.name || "",
  };

  const signUp = async (e: SubmitEvent) => {
    e.preventDefault();

    const signupResponse = await signup(form.email, form.password, form.name);
    if (signupResponse.success) {
      navigate("/");
    } else {
      const isServerReachable = signupResponse?.response?.status !== 0;
      const errorResponse: typeof errors = {};

      errorResponse.general = signupResponse?.response?.data.message;
      if (!errorResponse.general && !isServerReachable)
        errorResponse.general = "Authentication server is not reachable.";
      if (errorResponse.general === "Failed to create record.")
        delete errorResponse.general;

      console.log(signupResponse?.response?.data?.data);

      Object.keys(signupResponse?.response?.data?.data).forEach((key) => {
        errorResponse[key] =
          signupResponse?.response?.data?.data?.[key].message;
      });

      errors = errorResponse;
    }
  };
</script>

<div class="wrapper">
  <svelte:component this={logo} />
  <form on:submit={signUp}>
    <Text
      type="text"
      label="Display name"
      bind:value={form.name}
      error={errors?.name || null}
      required
      autofocus
    />
    <Text
      type="email"
      label="Email"
      bind:value={form.email}
      error={errors?.email || null}
      required
    />
    <Text
      type="password"
      label="Password"
      bind:value={form.password}
      error={errors?.password || null}
      required
    />
    <Button type="submit">Sign up</Button>
    {#if errors.general}
      <div class="error-message">{errors.general}</div>
    {/if}
    <p>
      Already have an account? <Link to="/" state={{ ...form }}>Login</Link>.
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
