<script lang="ts">
    import { onMount } from "svelte";
    import {
        faArrowLeft,
        faPen,
        faUserCircle,
        faXmark,
    } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { _editUser, _getUserById } from "../logic/api";
    import "../assets/view.css";
    import "../assets/auth.css";
    import "../assets/App.css";
    import type { FormEventHandler } from "svelte/elements";

    export let toast: Function | null = null;
    let editMode = false;
    let data: any | undefined = undefined;

    function getKeysFromUrl(key:string) {
        let url = new URL(window.location.href);
        return url.searchParams.get(key);
    }

    async function submit(e: Event) {
        e.preventDefault();
        let submitButton = document.querySelector(".confirm");
        if (submitButton) submitButton.classList.add("loading-button");

        if (!data) return;
        let result = await _editUser(data);
        setTimeout(() => {
            if(toast)toast(result);
            editMode = false;
        }, 600);
    }

    async function getUser() {
        let id = getKeysFromUrl("_id");
        if (id) data = await _getUserById(id);
    }
    onMount(() => {
        if (data !== undefined) return;
        getUser();
    });
</script>

{#if data}
    <section class="view-section">
        <header>
            <button on:click={() => window.location.assign("/")}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h3>{data.name}</h3>
            <button
                class="edit-button"
                style={editMode ? "color: var(--cred)" : ""}
                on:click={() => (editMode = !editMode)}
            >
                <FontAwesomeIcon icon={editMode ? faXmark : faPen} />
                {editMode ? "Cancel" : "Edit"}
            </button>
        </header>
        <section class="main-division">
            <div class="image-zone">
                <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <form on:submit={submit}>
                {#each Object.keys(data) as key, i}
                    {#if key !== "_id" && key !== "guid"}
                        <div
                            class="custom-input"
                            style={`animation-delay: ${500 + i * 100}ms;`}
                        >
                            <label>{key}</label>
                            {#if key === "gender"}
                                <select
                                    name="gender"
                                    bind:value={data[key]}
                                    disabled={!editMode}
                                >
                                    <option>Man</option>
                                    <option>Woman</option>
                                    <option>Other</option>
                                </select>
                            {:else}
                                <input
                                    type={key === "balance"
                                        ? "number"
                                        : key === "email"
                                          ? "email"
                                          : key === "phone"
                                            ? "tel"
                                            : "text"}
                                    bind:value={data[key]}
                                    disabled={!editMode}
                                />
                            {/if}
                        </div>
                    {/if}
                {/each}
                {#if editMode}
                    <button class="confirm" type="submit" data-text="Confirm"
                    ></button>
                {/if}
            </form>
        </section>
    </section>
{/if}
