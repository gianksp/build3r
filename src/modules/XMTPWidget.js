/**
 * XMTP Widget - HackFS 2022
 * 
 * This is a Build3r plugin that offers a widget similar to that of Intercom to have website/app visitors
 * be able to start a chat with the admin of the site/support team and ask questions or get help.
 * 
 * Builders can use Build3r platform while creating their websites and simply drag and drop the XMTP widget and
 * enable users to chat with them, no need to know coding or XMTP technical implementation. This lowers the entry
 * barrier for builders.
 * 
 * This implementation, for the HackFS 2022 hackathon, utilizes XMTP protocol https://xmtp.com/ to have
 * EVM wallet users communicate with each other in a decentralized way. For this, the protocol uses EVM wallet
 * signatures for managing identity and tracking conversation history.
 * 
 * This builder plugins imports a custom version of the example-chat-react
 * src: https://github.com/gianksp/example-chat-react/tree/gianksp-hackfs2022-widget
 * app: https://xmtp-chat-94a99.firebaseapp.com/
 * 
 * The above custom fork enables to provide configurable attributes in the URL to optimize for iframe use.
 * Example usage within this plugin: 
 * 
 * https://xmtp-chat-94a99.firebaseapp.com/?recipientWalletAddr=0x6a10C54110336937f184bf9A88bFD5998c8E99D4&logoUrl=https://www.pngall.com/wp-content/uploads/10/Message-Logo-PNG.png&color=f36a3d
 * 
 * where it receives the following query params:
 * 
 * recipientWalletAddr: the DM target
 * logoUrl: custom brand logo to display in nav bar
 * color: theme for nav bar
 * 
 * For builders and admins they can see all their conversations at 
 * https://xmtp-chat-94a99.firebaseapp.com/?color=fff&logoUrl=https://i.ibb.co/9yf7cgJ/output-onlinepngtools.png
 * 
 * @param {*} editor 
 */
const Plugin = (editor) => {
    const id = 'xmtp-widget';

    // Drag & Drop Spec
    const block = {
        id: `section-${id}`,
        label: 'Chat Support',
        category: 'Web3',
        attributes: {
          class: 'fa fa-comments-o',
        },
        content: `
            <section id="${id}">
              <button class="fab"></button>
              <div class="fab-container d-none">
                <div id="iframe-frame">
                </div>
              </div>
            </section>
            <style>
                #iframe-frame {
                    height:100%;
                }
                #iframe-frame iframe {
                    height: 100%;
                }
                .chat-container {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    border: 0px;
                }
                .fab {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 10;
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9qi5BnAOTIIsEU3-Ng_Xz_HkG2lFzv_k7PHD_YmYPjt2zMleoV-JpGOcsrGkTb8GxQlY&usqp=CAU');
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                .fab-container {
                    position: fixed;
                    bottom: 100px;
                    height: 400px;
                    width: 300px;
                    right: 20px;
                    z-index:10;
                    background: white;
                    border-radius: 8px;
                    border: 1px solid rgba(0,0,0,0.1);
                    overflow: hidden;
                }
                .message__outer {
                    display: flex;
                }
                
                .message__inner {
                    flex: 1;
                    display: flex;
                    flex-direction: row-reverse;
                }
            </style>`,
    };

    // Configurable properties
    const type = {
        isComponent: el =>  el.id === id,
        model: {
            defaults: {
                script,
                recipient: '0x6a10C54110336937f184bf9A88bFD5998c8E99D4',
                logoUrl: 'https://www.pngall.com/wp-content/uploads/10/Message-Logo-PNG.png',
                hexColor: 'f36a3d',
                traits: [
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'recipient' // EVM Wallet address of the builder/site operator (admin)
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'logoUrl' // Logo to display on widget open
                    },
                    {
                        changeProp: 1,
                        type: 'text',
                        name: 'hexColor' // Bg color of nav bar
                    }
                ],
                'script-props': ['recipient', 'logoUrl', 'hexColor']
            }
        }
    };

    // Behavior
    function script (props) {
        if(!props.recipient || !props.hexColor || !props.logoUrl) return;
        $('.fab').on('click', function () {
            const isHidden = $( ".fab-container" ).hasClass( "d-none" );
            if (isHidden) {
                $( ".fab-container" ).removeClass( "d-none" );
            } else {
                $( ".fab-container" ).addClass( "d-none" );
            }
        });

        // Source code of the adapted example-chat-app to enable configurable and targeted messaging available at
        // https://github.com/gianksp/example-chat-react/tree/gianksp-hackfs2022-widget
        $('#iframe-frame').html(`
            <iframe src="https://xmtp-chat-94a99.firebaseapp.com/?recipientWalletAddr=${props.recipient}&color=${props.hexColor}&logoUrl=${props.logoUrl}" 
                    class="chat-container" 
                    style="height:100%;">
            </iframe>`
        );
    };

    // Append to editor
    editor.BlockManager.add(id, block)
    editor.DomComponents.addType(id, type);
}

export default Plugin;

