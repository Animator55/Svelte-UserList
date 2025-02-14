<script lang="ts">
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

<section class='back-blur' on:click={(e) => {
    let target = e.target as HTMLDivElement
    if (target && target.classList.contains("back-blur") && close) close();
}}>
    <div class='pop'>
        <form bind:this={formRef} on:submit={handleSubmit}>
            <h3>Create User</h3>
            <hr>
            <div class='labeled-input'>
                <label>Name</label>
                <input name='name' />
            </div>
            <div class='labeled-input'>
                <label>Gender</label>
                <select name='gender'>
                    <option>Man</option>
                    <option>Woman</option>
                    <option>Other</option>
                </select>
            </div>
            <hr>
            <div class='labeled-input'>
                <label>Email</label>
                <input type='email' name='email' />
            </div>
            <div class='labeled-input'>
                <label>Phone</label>
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
