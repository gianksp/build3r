/**
 * Covalent Price Context Widget - HackFS 2022
 * 
 * This widget provides contextual information on price corresponding in USD for a given token using the Covalent API. 
 * Once this widget is added to the canvas and a css class is added as a property it will scan all the entries in the 
 * DOM with that class and append the value in USD.
 * 
 * It can be used to render price in USD next to the current price in other tokens for example when displaying a dashboard
 * or a list with nft prices in their local tokens.
 * 
 * For this demo you can add the GraphChart plugin to the canvas and then include the PriceContext plugin anywhere. It will
 * emit an event that will aler components consuming pricing.
 * 
 * @param {
 * } editor 
 */
const Plugin = (editor) => {

    const id = 'coin-price';

    // Drag & Drop Spec
    const block = {
        id: `section-${id}`,
        label: 'Price Context',
        category: 'Web3',
        attributes: {
          class: 'fa fa-bitcoin',
        },
        content: `
            <section id="${id}" class="bg-white coin-price-content">
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
        isComponent: el =>  el.id === id,
        model: {
            defaults: {
                script,
                covalentKey: process.env.COVALENT_API_KEY,
                ticker: 'ETH',
                targetClass: 'pricing-item',
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
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'targetClass'
                    }
                ],
                'script-props': ['covalentKey', 'ticker', 'targetClass']
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
                const price = parseFloat(item?.quote_rate);
                $('.coin-price-logo').attr('src',item?.logo_url);;
                $('.coin-price-ticker').text(item?.contract_ticker_symbol);
                $('.coin-price-quote').text(item?.quote_rate);
                $(`.${props.targetClass}`).each(function(element, index){
                    const orgval = $( this ).text();
                    const val = parseFloat(ethers.utils.formatEther(orgval));
                    const r = val * price;
                    $( this ).text(`${orgval} ($${r.toFixed(2)})`);
                });
                // Also trigger event
                window.priceContextUpdate = price;
                document.dispatchEvent(new Event('priceContextUpdate'))
                console.log('triggering...');
            });
        };
        
        init();
    };

    // Append to editor
    editor.BlockManager.add(id, block)
    editor.DomComponents.addType(id, type);
}

export default Plugin;

