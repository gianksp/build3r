const Plugin = (editor) => {

    // Drag & Drop Spec
    const block = {
        id: 'section-wallet-metamask',
        label: 'Metamask',
        category: 'Web3',
        attributes: {
          // class: 'fa fa-bitcoin',
        },
        content: `
            <section id="wallet-metamask" class="bg-white coin-price-content">
              <button id="btn-login" type="button" class="btn">Connect with 🦊</button>
              <button id="btn-logout" type="button" class="btn" style="display:none;">Disconnect</button>
            </section>
            <style>
          .coin-price-component img {
            display: inline-block;
          }
          </style>`,
    };

    // Configurable properties
    const type = {
        isComponent: el =>  el.id === 'wallet-metamask',
        model: {
            defaults: {
                script,
                serverUrl: '',
                appId: '',
                traits: [
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'serverUrl'
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'appId'
                    }
                ],
                'script-props': ['serverUrl', 'appId']
            }
        }
    };

    // Behavior
    function script (props) {
      // $.getScript('https://unpkg.com/moralis/dist/moralis.js', function( data, textStatus, jqxhr ) {
      //   console.log( data ); // Data returned
      //   console.log( textStatus ); // Success
      //   console.log( jqxhr.status ); // 200
      //   console.log( "Load was performed." );
      // });
      console.log(props);
      const serverUrl = props.serverUrl;
      const appId = props.appId;
      if (!serverUrl || !appId) return;
      Moralis.start({ serverUrl, appId });

      /* Authentication code */
      

      

      $("#btn-login").on("click", async function login() {
        console.log("login...");
        let user = Moralis.User.current();
        if (!user) {
          user = await Moralis.authenticate({
            signingMessage: "Log in using Moralis",
          })
            .then(function (user) {
              console.log("logged in user:", user);
              console.log(user.get("ethAddress"));
              $('#btn-login').hide();
              $('#btn-logout').show();
              $('#btn-logout').html(user.get("ethAddress"));
            })
            .catch(function (error) {
              console.log(error);
              $('#btn-login').show();
              $('#btn-logout').hide();
            });
        }
      });

      $("#btn-logout").on("click", async function logOut() {
        console.log("logout");
        await Moralis.User.logOut();
        console.log("logged out");
        $('#btn-login').show();
        $('#btn-logout').hide();
      });

      // Current State
      const currentUser = Moralis?.User?.current();
      if (currentUser) {
          // do stuff with the user
          $('#btn-login').hide();
          $('#btn-logout').show();
          $('#btn-logout').html(currentUser.get("ethAddress"));
      } else {
          // show the signup or login page
          $('#btn-login').show();
          $('#btn-logout').hide();
      }
    };

    // Append to editor
    editor.BlockManager.add('wallet-metamask', block)
    editor.DomComponents.addType('wallet-metamask', type);
}

export default Plugin;

