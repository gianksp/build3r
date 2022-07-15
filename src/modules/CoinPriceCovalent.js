const Plugin = (editor) => {

    // Drag & Drop Spec
    const block = {
        id: 'section-coin-price',
        label: 'Coin Price',
        category: 'Web3',
        attributes: {
          class: 'fa fa-bitcoin',
        },
        content: `
            <section id="coin-price" class="bg-white coin-price-content">
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
        isComponent: el =>  el.id === 'coin-price',
        model: {
            defaults: {
                script,
                covalentKey: '',
                ticker: 'ETH',
                traits: [
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'covalentKey'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'ticker'
                    }
                ],
                'script-props': ['covalentKey', 'ticker']
            }
        }
    };

    // Behavior
    function script (props) {
        if (!props.ticker || !props.covalentKey) return;

        function init () {
            fetch(
            `https://api.covalenthq.com/v1/pricing/tickers/?tickers=${props.ticker}&key=${props.covalentKey}`
            )
            .then(function (response) { return response.json() })
            .then(function ({ data }) {
                if (!data) return;
                const item = data.items[0];
                $('.coin-price-logo').attr('src',item?.logo_url);;
                $('.coin-price-ticker').text(item?.contract_ticker_symbol);
                $('.coin-price-quote').text(item?.quote_rate);
            });
        };
        
        init();
    };

    // Append to editor
    editor.BlockManager.add('coin-price', block)
    editor.DomComponents.addType('coin-price', type);
}

export default Plugin;

