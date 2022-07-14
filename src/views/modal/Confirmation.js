const ConfirmationModal = () => {
    return (`
        <div class="alert alert-success text-wrap" role="alert">
            <h4 class="alert-heading">Your site is live!</h4>
            <a target="_blank" href="https://dappify.com" id="project-url">Your project URL</a>
            <hr>
            <p class="mb-0">Make sure to copy the URL and share it with your friends!.</p>
        </div>
    `)
}

export default ConfirmationModal;