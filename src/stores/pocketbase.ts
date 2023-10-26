import { writable } from "svelte/store";
import Avatar from "avatar-initials";
import PocketBase from "pocketbase";

export const pbUrl =
  import.meta.env.MODE === "development" ||
  window?.location?.hostname === "localhost"
    ? "http://127.0.0.1:8090/"
    : "/";
const pb = new PocketBase(pbUrl);

function dataURItoBlob(dataURI: string) {
  const binary = atob(dataURI.split(",")[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
}

export const user = writable(null);
export const loading = writable(pb.authStore.isValid);

const refreshUser = async () => {
  try {
    await pb.collection("users").authRefresh({}, { $autoCancel: false });
  } catch (e) {
    loading.set(false);
  }
};

if (loading) {
  refreshUser();
}

export const signin = async (usernameOrEmail: string, password: string) => {
  try {
    await pb.collection("users").authWithPassword(usernameOrEmail, password);
    return { success: true };
  } catch (e) {
    return { success: false, response: e as any };
  }
};

export const signup = async (email: string, password: string, name: string) => {
  const avatarBlob = dataURItoBlob(
    Avatar.initialAvatar({
      initials: name
        .split(/[ -]/)
        .map((n) => n.charAt(0))
        .join("")
        .toUpperCase(),
      initial_fg: "#fff",
      initial_bg: "#f28232",
      initial_size: 256,
      initial_weight: 700,
      initial_font_family: "'Inter', sans-serif",
      size: 512,
    }),
  );

  const data = {
    name: name,
    email: email,
    emailVisibility: false,
    password: password,
    passwordConfirm: password,
    role: "user",
  };

  const formData = new FormData();
  formData.append("avatar", avatarBlob);
  Object.entries(data).forEach(([key, value]) => {
    formData.append(
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    );
  });

  try {
    await pb.collection("users").create(formData);
    await signin(email, password);
    return { success: true }; // success
  } catch (e) {
    return { success: false, response: e as any };
  }
};

export const signout = async () => {
  try {
    pb.authStore.clear();
    user.set(null);
  } catch (e) {
    console.log("Sign out error", e);
  }
};

pb.authStore.onChange((token, model) => {
  if (model !== null) {
    loading.set(false);
    user.set(model as any);
    console.log("User auth model updated", { model });
  }
});

export { pb, refreshUser };
