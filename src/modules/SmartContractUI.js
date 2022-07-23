/**
 * SmartContractUI Plugin - HackFS 2022
 * 
 * This plugin for Build3r allows anyone to quickly create an interface for smart contract methods by drag
 * and dropping as a UI module to the canvas.
 * 
 * As a builder you can specify target method, contract address and abi and this component
 * will render the UI to access the method.
 * 
 * By default is allowing users to generate an NFT token for our smart contract in Polygon 
 * https://polygonscan.com/address/0xC20Aa5e1e51d36e21fC91D953eed2e46681412C3
 * 
 * Prerrequisites:
 * 
 * This plugin depends on WalletAuth plugin to inject Web3 provider context into the website so it should be
 * used in conjunction.
 * 
 * Users:
 * 
 * A visitor to the page, who has signed in with WalletAuth plugin can invoke this plugin function, provided
 * the parameters and execute a smart contract action directly. They will need to be pointing to the right
 * wallet address.
 * 
 * 
 * @param {
 * } editor 
 */
const Plugin = (editor) => {

    // Drag & Drop Spec
    const block = {
        id: 'section-smart-contract-ui',
        label: 'Smart Contract UI',
        category: 'Web3',
        attributes: {
          class: 'fa fa-file-code-o',
        },
        content: `
            <section id="smart-contract-ui">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                    </div>
                </div>
                <div class="modal" tabindex="-1" role="dialog" id="sc-ui-modal>
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        `
    };

    // Configurable properties
    const type = {
        isComponent: el =>  el.id === 'smart-contract-ui',
        model: {
            defaults: {
                script,
                method: 'mint',
                contractAddress: '0xC20Aa5e1e51d36e21fC91D953eed2e46681412C3',
                abi: `[
                    {
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "_name",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "_symbol",
                                "type": "string"
                            }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                    },
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "owner",
                                "type": "address"
                            },
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "approved",
                                "type": "address"
                            },
                            {
                                "indexed": true,
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            }
                        ],
                        "name": "Approval",
                        "type": "event"
                    },
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "owner",
                                "type": "address"
                            },
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "operator",
                                "type": "address"
                            },
                            {
                                "indexed": false,
                                "internalType": "bool",
                                "name": "approved",
                                "type": "bool"
                            }
                        ],
                        "name": "ApprovalForAll",
                        "type": "event"
                    },
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "previousOwner",
                                "type": "address"
                            },
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "newOwner",
                                "type": "address"
                            }
                        ],
                        "name": "OwnershipTransferred",
                        "type": "event"
                    },
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "from",
                                "type": "address"
                            },
                            {
                                "indexed": true,
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "indexed": true,
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            }
                        ],
                        "name": "Transfer",
                        "type": "event"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            }
                        ],
                        "name": "approve",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "owner",
                                "type": "address"
                            }
                        ],
                        "name": "balanceOf",
                        "outputs": [
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            }
                        ],
                        "name": "getApproved",
                        "outputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "owner",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "operator",
                                "type": "address"
                            }
                        ],
                        "name": "isApprovedForAll",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "_receiver",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "_beneficiary",
                                "type": "address"
                            },
                            {
                                "internalType": "uint96",
                                "name": "_feeNumerator",
                                "type": "uint96"
                            },
                            {
                                "internalType": "string",
                                "name": "_tokenURI",
                                "type": "string"
                            }
                        ],
                        "name": "mint",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "name",
                        "outputs": [
                            {
                                "internalType": "string",
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "owner",
                        "outputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            }
                        ],
                        "name": "ownerOf",
                        "outputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "renounceOwnership",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "_tokenId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "_salePrice",
                                "type": "uint256"
                            }
                        ],
                        "name": "royaltyInfo",
                        "outputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "from",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            }
                        ],
                        "name": "safeTransferFrom",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "from",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bytes",
                                "name": "_data",
                                "type": "bytes"
                            }
                        ],
                        "name": "safeTransferFrom",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "operator",
                                "type": "address"
                            },
                            {
                                "internalType": "bool",
                                "name": "approved",
                                "type": "bool"
                            }
                        ],
                        "name": "setApprovalForAll",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "_receiver",
                                "type": "address"
                            },
                            {
                                "internalType": "uint96",
                                "name": "_feeNumerator",
                                "type": "uint96"
                            }
                        ],
                        "name": "setDefaultRoyalty",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "bytes4",
                                "name": "interfaceId",
                                "type": "bytes4"
                            }
                        ],
                        "name": "supportsInterface",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "symbol",
                        "outputs": [
                            {
                                "internalType": "string",
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            }
                        ],
                        "name": "tokenURI",
                        "outputs": [
                            {
                                "internalType": "string",
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "from",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            }
                        ],
                        "name": "transferFrom",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "newOwner",
                                "type": "address"
                            }
                        ],
                        "name": "transferOwnership",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    }
                ]`,
                traits: [
                    {
                        changeProp: 1,
                        contractAddress: 'text',
                        name: 'contractAddress'
                    },
                    {
                        changeProp: 1,
                        abi: 'text',
                        name: 'abi'
                    },
                    {
                        changeProp: 1,
                        abi: 'text',
                        name: 'method'
                    }
                ],
                'script-props': ['contractAddress', 'abi', 'method']
            }
        }
    };

    // Behavior
    function script (props) {
        if (!props.contractAddress || !props.abi) return;

        const address = props.contractAddress;
        const abi = JSON.parse(props.abi);

        console.log($('#sc-ui-modal'));


        function renderInputs (item) {
            const items = [];
            item.inputs.forEach(function(input) {
                items.push(`
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="form_${input.name}">${input.name}</span>
                        </div>
                        <input type="text" class="form-control" name="${input.name}" placeholder="${input.type}" aria-describedby="form_${input.name}">
                    </div>
                `);
            })
            return items;
        };

        $('.row-cols-1').empty();
        const col = $( ".row" );
        abi.filter(function(item) { 
            return item.type === 'function' && item.name === props.method
        }).forEach(function(item) {
            const $newdiv1 = $(`
                <div class="col">
                    <form>
                        ${renderInputs(item).join('')}
                        <button class="btn btn-primary btn-lg btn-block" id="${item.name}" onclick="handleButtonClick(event)">${item.name}</button><br>
                    </form>
                </div>
            `)
            col.append( $newdiv1 );
        });

        window.handleButtonClick = async function (e) {
            e.preventDefault();
            // const { name } = e.target.id;
            console.log("Wtf");
            // console.log(e.target.id);
            // console.log();
            const form = $(`#${e.target.id}`).closest("form").serializeArray();
            console.log(form);

            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            console.log(provider);
            let accounts = await provider.send("eth_requestAccounts", []);
            console.log(accounts);
            let account = accounts[0];
            const signer = provider.getSigner(account);
            console.log(signer);
            console.log(abi);
            console.log(address);
            const contract = new ethers.Contract(address, abi, signer, { gasLimit: ethers.utils.hexlify(250000), gasPrice: ethers.utils.parseUnits('5', "gwei") });
            console.log(contract);
            const args = form.map(function(item) { return item.value; });
            console.log("arguments");
            console.log(args);
            console.log(...args);
            console.log(e.target.id);
            console.log("0-----");
            const targetFn = contract[e.target.id];
            console.log(targetFn);
            const res = await targetFn(...args);
            console.log(res);
            // const inputs = form.filter(':input');
            // console.log(inputs.val());
            // inputs.forEach(function(input){
            //     //your code here
            //     console.log(input);
            // });
            // console.log("invoke "+e.target.id)

            // console.log(e.target.form);
            // const payload = new FormData($(`#${e.target.dataset.name}`));
            // console.log(payload);
        }
        // function init () {
        //     fetch(
        //     `https://api.covalenthq.com/v1/pricing/tickers/?tickers=${props.ticker}&key=${props.covalentKey}`
        //     )
        //     .then(function (response) { return response.json() })
        //     .then(function ({ data }) {
        //         if (!data) return;
        //         const item = data.items[0];
        //         $('.coin-price-logo').attr('src',item?.logo_url);;
        //         $('.coin-price-ticker').text(item?.contract_ticker_symbol);
        //         $('.coin-price-quote').text(item?.quote_rate);
        //     });
        // };
        
        // init();
    };

    // Append to editor
    editor.BlockManager.add('smart-contract-ui', block)
    editor.DomComponents.addType('smart-contract-ui', type);
}

export default Plugin;

