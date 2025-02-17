<script lang="ts">
  import UserList from "./lib/UserList.svelte";
  import Login from "./lib/Login.svelte";
  import UserView from "./lib/UserView.svelte";

  let currentRoute = window.location.pathname

  const toast = (val: {
    title: string;
    content: string;
    icon: string;
    _id: string;
  }) => {
    let container = document.querySelector(".toast-container");
    if (!container) return;

    const colorSelector: { [key: string]: string } = {
      warn: "var(--corange)",
      xmark: "var(--cred)",
      check: "var(--cgreen)",
    };
    const iconSelector: { [key: string]: string } = {
      warn: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="triangle-exclamation" class="svg-inline--fa fa-triangle-exclamation " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>',
      xmark:
        '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-xmark" class="svg-inline--fa fa-circle-xmark " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"></path></svg>',
      check:
        '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" class="svg-inline--fa fa-circle-check " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg>',
    };

    let toast = document.createElement("section");
    toast.innerHTML = `<header style="color: ${colorSelector[val.icon]};">
          ${iconSelector[val.icon]}
          <h3>${val.title}</h3>
          </header>
      <p>${val.content}</p>`;
    toast.className = "toast";
    container.appendChild(toast);
    setTimeout(() => {
      if (toast) toast.remove();
    }, 3300);
  };

  const offline = true
  let routeComponent;

  $: {
    if (currentRoute === "/") routeComponent = UserList;
    else if (currentRoute === "/auth") routeComponent = Login;
    else if (currentRoute === "/user") routeComponent = UserView;
    else routeComponent = null;
  }
</script>

<div class="toast-container"></div>
<svelte:component this={routeComponent} {toast} {offline} />

<style>
  @import "./assets/App.css";
</style>
