/**
 * NFT Search - HackFS 2022
 * 
 * This is a plugin for build3r that leverages NFT Port search capabilities to let any user
 * drag and drop a configurable search container for NFTs on their landing page/app.
 * 
 * It can be used in conjunction other plugins to add contextual value for users and lowering
 * the entry barrier for builders since now they will be able to use NFTPort
 * functionalities without writing any code.
 * 
 * 
 * @param {*} editor 
 */
const NFTSearch = (editor) => {
    const id = 'nft-search';
    // Drag & Drop Spec
    const block = {
        id: `section-${id}`,
        label: 'NFT Search',
        category: 'Web3',
        attributes: {
          class: 'fa fa-binoculars',
        },
        content: `
            <section id="${id}">
                <div class="input-group mb-3">
                    <input id="nft-search-input" type="text" class="form-control" placeholder="Type a text to search NFTs by e.g robot" aria-label="Type a text to search NFTs by e.g robot" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                    <button id="nft-search-btn" class="btn btn-outline-secondary" type="button">Search</button>
                    </div>
                </div>
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                    </div>
                </div>
            </section>
        `,
    };

    // Configurable properties
    const type = {
        isComponent: el =>  el.id === id,
        model: {
            defaults: {
                script,
                apiKey: '625bb9ba-bbde-4756-8117-3193a51123f3',
                searchText: 'robot',
                contractAddress: '',
                chain: 'ethereum',
                traits: [
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'apiKey'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'searchText'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'contractAddress'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'chain'
                    }
                ],
                'script-props': ['apiKey', 'searchText', 'contractAddress', 'chain']
            }
        }
    };

    // Behavior
    function script (props) {
        if (!props.apiKey) return;

        function searchNFT (search) {
            $('.row-cols-1').empty();
            const col = $( ".row" );
            fetch(`https://api.nftport.xyz/v0/search?chain=${props.chain}&page_size=20${props.contractAddress ? `&filter_by_contract_address=${props.contractAddress}` : ''}${search ? `&text=${search}` : ''}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": props.apiKey
            }
            })
            .then(response => response.json())
            .catch(err => {
            }).then(response => {
                const results = response?.search_results || [];
                results.forEach(function(item){
                    console.log(item);
                    const $newdiv1 = $(`
                        <div class="col">
                            <div class="card" style="width: 18rem;">
                                <img class="card-img-top" src='${item.cached_file_url}' alt="Card image cap" height="250px" width="auto">
                                <div class="card-body">
                                    <p class="card-text">${item.description}</p>
                                </div>
                            </div>
                        </div>
                    `)
                    col.append( $newdiv1 );
                });
            });
        };
        
        $('#nft-search-btn').on('click', function () {
            var searchVal = $('#nft-search-input').val();
            searchNFT(searchVal);
        });
        
        if (props.searchText)
            searchNFT(props.searchText);
    };

    // Append to editor
    editor.BlockManager.add(id, block)
    editor.DomComponents.addType(id, type);
}

export default NFTSearch;

