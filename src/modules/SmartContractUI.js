const Plugin = (editor) => {

    // Drag & Drop Spec
    const block = {
        id: 'section-smart-contract-ui',
        label: 'Smart Contract UI',
        category: 'Web3',
        attributes: {
          class: 'fa fa-bitcoin',
        },
        content: `
            <section id="smart-contract-ui">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
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
                    }
                ],
                'script-props': ['contractAddress', 'abi']
            }
        }
    };

    // Behavior
    function script (props) {
        if (!props.contractAddress || !props.abi) return;

        const address = props.contractAddress;
        const abi = JSON.parse(props.abi);


        function renderInputs (item) {
            return item.inputs.map(function(input) {
                return (`
                    <div>
                        <label for="${input.name}">${input.name}</label><br>
                        <input name="${input.name}" placeholder="${input.type}"></input><br>
                    </div>
                `);
            })
        };

        $('.row-cols-1').empty();
        const col = $( ".row" );
        abi.filter(function(item) { 
            return item.type === 'function' 
        }).forEach(function(item) {
            console.log(item);
                     // ${item.stateMutability !== 'view' ? (`
                        //     <label for="${item.name}_value">Value ETH</label><br>
                        //     <input name="${item.name}_value" placeholder="Value"></input><br></br>
                        // `) : ''}
            const $newdiv1 = $(`
                <div class="col">
                    <form>
                        ${renderInputs(item)}
                        <button id="${item.name}" onclick="handleButtonClick(event)">${item.name}</button><br>
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
            console.log(...args);
            console.log(e.target.id);
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

