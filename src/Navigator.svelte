<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import Login from "./pages/auth/Login.svelte";
  import SignedOnlyRoute from "./components/AuthOnlyRoute.svelte";
  import SignUp from "./pages/auth/SignUp.svelte";
  import Button from "./components/form/Button.svelte";
  import { signout } from "./stores/pocketbase";
</script>

<Router>
  <Route path="/login" component={Login} />
  <Route path="/signup" component={SignUp} />
  <Route>
    <SignedOnlyRoute>
      <Router>
        <Route path="/">
          <div style="display: grid; gap: 20px; text-align: center">
            <Link to="/example/dataGoesHere">Try the URL params</Link>
            <Button
              onClick={() => {
                signout();
              }}>Logout</Button
            >
          </div>
        </Route>
        <Route path="/example/:id" let:params>
          <div style="display: grid; gap: 20px; text-align: center">
            <h1>Example</h1>
            <p>Your URL param is: {params.id}</p>
            <Button
              onClick={() => {
                signout();
              }}>Logout</Button
            >
          </div>
        </Route>
      </Router>
    </SignedOnlyRoute>
  </Route>
</Router>
