const PublishModal = () => {
    return (`
        <div>
            <p class='inline'><h4>Hi, <strong><span id="current-email"></span></strong> <button onclick="handleSwitchAccount(event)" type="button" class="btn btn-light">Switch account</button></h4> </p>
            <p>Do you want yo publish a new revision of your template to IPFS, the permanent web?</p>
        
            <div class="row g-0 bg-light position-relative">
            <div class="col-md-6 mb-md-0 p-md-4">
                <img src="https://moralis.io/wp-content/uploads/2021/06/21_06_What_is_Interplanetary-File-System_IPFS.jpg" class="w-100" alt="Learn more about IPFS">
            </div>
            <div class="col-md-6 p-4 ps-md-0">
                <h6 class="mt-0">About IPFS</h6>
                <p>IPFS is a distributed system for storing and accessing files, websites, applications, and data.</p>
                <a target="_blank" href="https://moralis.io/what-is-ipfs-interplanetary-file-system/" class="stretched-link">Learn more!</a>
            </div>
            </div>


            <button id="publish-btn" class="w-100 btn btn-lg btn-primary" type="submit" onclick="handlePublishToIpfs(event)">Publish</button>
            <button id="wait-publish-btn" class="w-100 btn btn-lg btn-primary d-none" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Publishing...
            </button>
        </div>
    `)
}

export default PublishModal;