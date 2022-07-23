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
                Auctions
                <ul class="list-group">
                    <li class="list-group-item">Successful Auctions</li>
                </ul>
            </section>`,
    };

    // Configurable properties
    const type = {
        isComponent: el =>  el.id === id,
        model: {
            defaults: {
                script,
                nftAddress: '0xa92e3ab42c195e52c9fbf129be47ecbb03845dfd',
                traits: [
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'nftAddress'
                    }
                ],
                'script-props': ['nftAddress']
            }
        }
    };

    // Behavior
    function script (props) {
        if (!props.nftAddress) return;

        function init () {
            // $('.list-group').empty();
            const col = $( ".list-group-item" );
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "query": `{\n  auctionSuccessfuls(where: { nftAddress: \"${props.nftAddress}\" }, first: 5) {\n    id\n    nftAddress \n    tokenId\n    totalPrice\n  }\n}\n`,
            "variables": null
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://api.thegraph.com/subgraphs/name/abhijeet0401/openseagraphsubgraph", requestOptions)
            .then(function(response) {
                console.log(response);
                return response.json()
            })
            .then(function(response) {
                console.log(response);
                const results = response?.data?.auctionSuccessfuls || [];
                results.forEach(function(item){
                    console.log(item);
                    const $newdiv1 = $(`
                        <li class="list-group-item" style="color:black;">#${item.tokenId} - <span class="pricing-item" style="color:black;">${item.totalPrice}</span></li>
                    `)
                    col.append( $newdiv1 );
                });
            })
            .catch(function(error) {
                console.log('error', error)
            });
        };
        
        init();
    };

    // Append to editor
    editor.BlockManager.add(id, block)
    editor.DomComponents.addType(id, type);
}

export default Plugin;

