const Plugin = (editor) => {

    const id = 'wallet-metakask'
    // Drag & Drop Spec
    const block = {
        id: `section-${id}`,
        label: 'Connect Wallet',
        category: 'Web3',
        attributes: {
          class: 'fa fa-address-card-o',
        },
        content: `
            <section id="${id}">
              <button id="btn-login" type="button" class="btn">Connect wallet</button>
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
        isComponent: el =>  el.id === id,
        model: {
            defaults: {
                script,
                serverUrl: process.env.SERVER_URL,
                appId: process.env.APP_ID,
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
      const serverUrl = props.serverUrl;
      const appId = props.appId;
      if (!serverUrl || !appId) return;
      Moralis.start({ serverUrl, appId });

      /* Authentication code */
      $("#btn-login").on("click", async function login() {
        let user = Moralis.User.current();
        if (!user) {
          user = await Moralis.authenticate({
            signingMessage: "Log in using Moralis",
          })
            .then(function (user) {
              $('#btn-login').hide();
              $('#btn-logout').show();
              $('#btn-logout').html(user.get("ethAddress"));
            })
            .catch(function (error) {
              $('#btn-login').show();
              $('#btn-logout').hide();
            });
        }
      });

      $("#btn-logout").on("click", async function logOut() {
        await Moralis.User.logOut();
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
    editor.BlockManager.add(id, block)
    editor.DomComponents.addType(id, type);
}

export default Plugin;

