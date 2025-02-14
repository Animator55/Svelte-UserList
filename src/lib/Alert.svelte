<script>
    import { onMount } from 'svelte';
    import { faCircleNotch, faWarning } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    
    let loading = true;
    
    onMount(() => {
        setTimeout(() => {
            loading = false;
        }, 1000);
    });
</script>

<section class='alert'>
    {#if loading}
        <FontAwesomeIcon icon={faCircleNotch} spin />
    {:else}
        <div>
            <FontAwesomeIcon class='' icon={faWarning} />
            <p>No items to display</p>
        </div>
    {/if}
</section>

<style>
    @import "../assets/pop.css";
</style>
