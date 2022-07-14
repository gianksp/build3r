const LoginModal = () => {
    return (`
        <form id="signin-form" onsubmit="handleAuth(event)">
            <div class="text-center">
            <img class="mb-4" src="./assets/img/dappify-logo-full.png" alt="" width="200" height="auto" />
            </div>
        
            <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input name="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">You will receive a magic link to complete the process</div>
            </div>
        
        
            <button id="submit-link-btn" class="w-100 btn btn-lg btn-primary" type="submit">Send me the link!</button>
            <button id="wait-link-btn" class="w-100 btn btn-lg btn-primary d-none" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Preparing link...
            </button>
        </form>
    `)
}

export default LoginModal;