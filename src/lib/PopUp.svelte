<script lang="ts">
    import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    let formRef: HTMLFormElement | null = null;

    export let confirm: Function | null = null;
    export let close: Function | null = null;

    function handleSubmit(event: Event) {
        event.preventDefault();
        if (!formRef) return;
        
        let formData = new FormData(formRef);
        let submitButton = document.querySelector(".submit-button");
        if (submitButton) submitButton.classList.add('loading-button');

        setTimeout(() => {
            if(confirm)confirm(Object.fromEntries(formData.entries()));
            if(close)close();
            if (submitButton) submitButton.classList.remove('loading-button');
        }, 600);
    }
</script>

<section class='back-blur'>
    <div class='pop'>
        <button on:click={()=>{if(close) close()}}>
            <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
        <form bind:this={formRef} on:submit={handleSubmit}>
            <h3>Create User</h3>
            <hr>
            <div class='labeled-input'>
                <h4>Name</h4>
                <input name='name' />
            </div>
            <div class='labeled-input'>
                <h4>Gender</h4>
                <select name='gender'>
                    <option>Man</option>
                    <option>Woman</option>
                    <option>Other</option>
                </select>
            </div>
            <hr>
            <div class='labeled-input'>
                <h4>Email</h4>
                <input type='email' name='email' />
            </div>
            <div class='labeled-input'>
                <h4>Phone</h4>
                <input type='tel' name='phone' />
            </div>
            <button class='submit-button' type='submit' data-text='Create'>
            </button>
        </form>
    </div>
</section>

<style>
    @import "../assets/pop.css";
</style>
