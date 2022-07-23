/**
 * TheGraphChart - HackFS 2022
 * 
 * This plugins allows build3r users to drag and drop a charting module fed by subgraphs that they can configure
 * to render any type of data using TheGraph as API.
 * 
 * This makes possible for non devs to quickly render dynamic data based on onchain sets without having
 * to understand the complexities of blockchain or need to know about coding.
 * 
 * This plugin can be configured to access a subgraph and render through the following properties
 *  - subgraphUrl: the REST url of the subgraph e.g 'https://api.thegraph.com/subgraphs/name/abhijeet0401/openseagraphsubgraph'
 *  - requestBody: the REST body payload (as string) sent for filtering e.g '{"query":"{\\n  auctionSuccessfuls(where: { nftAddress: \\"0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd\\" }, first: 5) {\\n    id\\n    nftAddress \\n    tokenId\\n    totalPrice\\n  }\\n}\\n","variables":null}'
 *  - chartConfig
 * 
 * If provided context from CovalentPriceContext Plugin, it will render pricing in USD instead of native token
 * 
 * @param {
 * } editor 
 */
const Plugin = (editor) => {

    const id = 'graph-auction';
    // Drag & Drop Spec
    const block = {
        id: `section-${id}`,
        label: 'Graph Chart',
        category: 'Web3',
        attributes: {
          class: 'fa fa-bar-chart-o',
        },
        content: `
            <section id="${id}" class="bg-white coin-price-content">
            </section>`,
    };

    // Configurable properties
    const type = {
        isComponent: el =>  el.id === id,
        model: {
            defaults: {
                script,
                subgraphUrl: 'https://api.thegraph.com/subgraphs/name/abhijeet0401/openseagraphsubgraph',
                requestBody: '{"query":"{\\n  auctionSuccessfuls(where: { nftAddress: \\"0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd\\" }, first: 5) {\\n    id\\n    nftAddress \\n    tokenId\\n    totalPrice\\n  }\\n}\\n","variables":null}',
                responseKey: 'auctionSuccessfuls',
                title: 'Subgraph latest NFT auction price of 0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd by tokenId',
                xLabel: 'tokenId',
                yLabel: 'totalPrice',
                bg: 'rgb(255, 99, 132)',
                chartType: 'bar',
                traits: [
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'subgraphUrl'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'requestBody'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'responseKey'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'title'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'xLabel'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'yLabel'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'bg'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'chartType'
                    }
                ],
                'script-props': ['subgraphUrl', 'requestBody', 'responseKey', 'title', 'xLabel', 'yLabel', 'bg', 'chartType']
            }
        }
    };

    // Behavior
    function script (props) {
                
        function init () {
            $('#graph-auction').empty();
            const canvas = $('<canvas id="thegraphchart"></canvas>');
            $('#graph-auction').append(canvas);
            const col = $( ".list-group-item" );
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: props.requestBody,
                redirect: 'follow'
            };

            fetch(props.subgraphUrl, requestOptions)
            .then(function(response) {
                console.log(response);
                return response.json()
            })
            .then(function(response) {
                console.log(response);
                const results = response?.data[props.responseKey] || [];

                const config = {
                    type: props.chartType,
                    data: {
                        labels: results.map((res) => res[props.xLabel] ),
                        datasets: [{
                          label: props.title,
                          backgroundColor: props.bg,
                          borderColor: 'rgb(255, 99, 132)',
                          data: results.map((res) => {
                                const value = res[props.yLabel];
                                const context = window.priceContextUpdate;
                                if (context) {
                                    const val = parseFloat(ethers.utils.formatEther(value));
                                    return val * context;
                                } else {
                                    return value;
                                }
                            }),
                        }]
                      },
                    options: {}
                  };
                  console.log("Init chart");
                  const myChart = new Chart(
                    document.getElementById('thegraphchart'),
                    config
                  );

            })
            .catch(function(error) {
                console.log('error', error)
            });
        };
        
        init();
        document.addEventListener("priceContextUpdate", function(evnt){
            console.log('on priceContextUpdate');
            init();
        });
        $(window).on('priceContextUpdate', function (e) {
            console.log('on priceContextUpdate');
            init();
        }, false);
        console.log('Added listener');
    };

    // Append to editor
    editor.BlockManager.add(id, block)
    editor.DomComponents.addType(id, type);
}

export default Plugin;

