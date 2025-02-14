<script lang="ts">
    import { onMount } from 'svelte';
    import { faCaretRight, faMagnifyingGlass, faPlus, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import PopUp from './PopUp.svelte';
    import Alert from './Alert.svelte';
    import { _getUsers, _newUser } from '../logic/api';
    import type { userDataType, userType } from '../vite-env';
    
    export let toast: Function | null = null;

    let list: undefined | userType[] = undefined;
    let pop = false;
    let query = "";
    let inputRef: null | HTMLInputElement = null;

    const getList = async () => {
        list = await _getUsers(query);
        console.log(list)
    };

    const addUser = async (newUser: userDataType) => {
        let result = await _newUser(newUser);
        if(toast)toast(result);
    };

    onMount(() => {
        if (list || query === "") {
            if (inputRef) inputRef.focus();
            return;
        }
        getList();
    });
</script>

<section class="user-searcher">
    {#if pop}
        <PopUp confirm={addUser} close={() => pop = false} />
    {/if}
    <button class="logout" on:click={() => window.location.assign("/auth")}> 
        <FontAwesomeIcon icon={faRightToBracket} />
    </button>
    <header class="search-zone">
        <input class="search" placeholder="Search user..." bind:this={inputRef} bind:value={query} on:keydown={(e) => {
            if (e.key === "Enter") {
                list = undefined;
                getList();
            }
        }} />
        <button class="main-button" on:click={() => {
            list = undefined;
            getList();
        }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <button class="main-button" on:click={() => pop = true}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
    </header>
    <ul class="list">
        {#if list && list.length !== 0}
            {#each list as el, i}
                <button class="list-item" style="animation-delay: {i * 170}ms" on:click={(e) => {
                    let target = e.target as HTMLDivElement
                    if(target)target.classList.add("clicked-user");
                    setTimeout(() => {
                        window.location.assign("/user?_id=" + el._id);
                    }, 200);
                }}>
                    <p>{el.name}</p>
                    <p>{el.email}</p>
                    <FontAwesomeIcon icon={faCaretRight} />
                </button>
            {/each}
        {:else if query !== ""}
            <Alert />
        {/if}
    </ul>
</section>

<style>
    @import "../assets/App.css";
    @import "../assets/list.css";
</style>
