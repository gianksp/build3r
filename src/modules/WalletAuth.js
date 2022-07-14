const Plugin = (editor) => {

    // Drag & Drop Spec
    const block = {
        id: 'section-smart-contract-ui',
        label: 'Wallet Auth Button',
        category: 'Web3',
        attributes: {
          class: 'fa fa-bitcoin',
        },
        content: `
            <section id="smart-contract-ui" class="bg-white coin-price-content">
              <div class="coin-price-component">
                <img class="coin-price-logo" height="30" src="https://logos.covalenthq.com/tokens/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png"/>
                <span class="coin-price-ticker">WBTC: </span>
                <span class="coin-price-quote">$45957.59</span>
              </div>
            </section>
            <style>
          .coin-price-component img {
            display: inline-block;
          }
          </style>`,
    };

    // Configurable properties
    const type = {
        isComponent: el =>  el.id === 'smart-contract-ui',
        model: {
            defaults: {
                script,
                abi: '',
                method: '',
                traits: [
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'abi'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'method'
                    }
                ],
                'script-props': ['covalentKey', 'ticker']
            }
        }
    };

    // Behavior
    function script (props) {
        console.log("gg")
    };

    // Append to editor
    editor.BlockManager.add('smart-contract-ui', block)
    editor.DomComponents.addType('smart-contract-ui', type);
}

export default Plugin;

