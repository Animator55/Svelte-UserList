<script lang="ts">
    import "../assets/auth.css"
    import "../assets/App.css"
    import { faEye, faEyeSlash, faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { _auth } from '../logic/api';
    
    export let toast: Function | null = null;
    export let offline: boolean = false;
    
    let viewPassword = false;
    let email = "afoamsof@ngiao.com";
    let password = "a";
    let rememberMe = false;
    let form: HTMLFormElement | null = null;

    const submit = async () => {
        if(!form)return
        let submitButton = form.querySelector('.submit-button');
        if(!submitButton)return
        submitButton.classList.add('loading-button');

        let result = await _auth(email, password, offline);
        if(toast)toast(result);
        
        if (result.icon !== "check") {
            submitButton.classList.remove('loading-button');
            return;
        }
        
        setTimeout(() => {
            submitButton.classList.remove('loading-button');
            window.location.assign("/");
        }, 500);
    }
</script>

<section class='auth-section'>
    <h1>Login</h1>
    <div class='divisor' data-text=''></div>
    
    <form bind:this={form} on:submit|preventDefault={submit} class='form'>
        <div class='labeled-input'>
            <label>Email</label>
            <input type='email' bind:value={email} />
        </div>
        
        <div class='labeled-input'>
            <label>Password</label>
            <div class='input-container'>
                <input type={viewPassword ? 'text' : 'password'} bind:value={password} />
                <button type='button' class='check' on:click={() => viewPassword = !viewPassword}>
                    <FontAwesomeIcon icon={viewPassword ? faEyeSlash : faEye} />
                </button>
            </div>
        </div>
        
        <div class='check-box'>
            <h4>Remember me</h4>
            <button type='button' class='box' on:click={() => rememberMe = !rememberMe}>
                <FontAwesomeIcon icon={rememberMe ? faSquareCheck : faSquare} />
            </button>
        </div>

        <button class='submit-button' type='submit' data-text='Login'></button>
    </form>
</section>
