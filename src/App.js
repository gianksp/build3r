import PluginCoinPrice from './modules/CoinPriceCovalent';
import PluginWalletAuth from './modules/WalletAuth';
import NFTSearch from './modules/NFTSearch';
import SmartContractUI from './modules/SmartContractUI';
import './assets/css/tooltip.css';
import './assets/css/main.css';
import LoginModal from './views/modal/Login';
import PublishModal from './views/modal/Publish';
import ConfirmationModal from './views/modal/Confirmation';
import * as LandingPage from './templates/LadingPage';
    

// $().load("./views/modal/modal4.html #jquery-load-point");


    const serverUrl = process.env.SERVER_URL;
    const appId = process.env.APP_ID;
    console.log(appId);
    Moralis.start({ serverUrl, appId });
    


    
          var lp = './assets/img/';
          var plp = 'https://via.placeholder.com/350x250/';
          var images = [
            lp+'team1.jpg', lp+'team2.jpg', lp+'team3.jpg', plp+'78c5d6/fff/image1.jpg', plp+'459ba8/fff/image2.jpg', plp+'79c267/fff/image3.jpg',
            plp+'c5d647/fff/image4.jpg', plp+'f28c33/fff/image5.jpg', plp+'e868a2/fff/image6.jpg', plp+'cc4360/fff/image7.jpg',
            lp+'work-desk.jpg', lp+'phone-app.png', lp+'bg-gr-v.png'
          ];
    
          // Handle tailwind's use of slashes in css names
    const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-');
    
          var editor  = grapesjs.init({
            avoidInlineStyle: 1,
            height: '100%',
            container : '#gjs',
            fromElement: 1,
            showOffsets: 1,
            assetManager: {
              embedAsBase64: 1,
              assets: images
            },
      //       storageManager:  {
      //   type: 'indexeddb',
      //   // ...
      // },
            storageManager:  {
              type: 'firestore'
            },
            canvas: {
              scripts: [
                'https://unpkg.com/moralis/dist/moralis.js',
                'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
                'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/ethers/5.6.9/ethers.umd.min.js'
              ],
              // The same would be for external styles
              styles: [
                'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css'
              ],
            },
            selectorManager: { componentFirst: true, escapeName },
            styleManager: { sectors: [] },
            plugins: [
              // PluginCoinPrice,
              PluginWalletAuth,
              NFTSearch,
              SmartContractUI,
              // 'grapesjs-project-manager',
              // 'grapesjs-tailwind',
              // 'grapesjs-lory-slider',
              // 'grapesjs-tabs',
              // 'grapesjs-custom-code',
              // 'grapesjs-touch',
              // 'grapesjs-parser-postcss',
              // 'grapesjs-tooltip',
              // 'grapesjs-tui-image-editor',
              // 'grapesjs-typed',
              // 'grapesjs-style-bg',
              'gjs-preset-webpage',
            ],
            pluginsOpts: {
              'grapesjs-project-manager': { 
                  loadFirst: false,
                  apiKey: process.env.FIREABSE_API_KEY,
                  authDomain: process.env.FIREBASE_DOMAIN,
                  projectId: process.env.FIREBASE_ID,
              },
              'grapesjs-tui-image-editor': {
                script: [
                  // 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
                  'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
                  'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
                  'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
                ],
                style: [
                  'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
                  'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css'
                ],
              },
              'grapesjs-lory-slider': {
                sliderBlock: {
                  category: 'Extra'
                }
              },
              'grapesjs-tabs': {
                tabsBlock: {
                  category: 'Extra'
                }
              },
              'grapesjs-typed': {
                block: {
                  category: 'Extra',
                  content: {
                    type: 'typed',
                    'type-speed': 40,
                    strings: [
                      'Text row one',
                      'Text row two',
                      'Text row three',
                    ],
                  }
                }
              },
              'gjs-preset-webpage': {
                modalImportTitle: 'Import Template',
                modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
                modalImportContent: function(editor) {
                  return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
                },
                filestackOpts: null, //{ key: 'AYmqZc2e8RLGLE7TGkX3Hz' },
                aviaryOpts: false,
                blocksBasicOpts: { flexGrid: 1 },
                customStyleManager: [{
                  name: 'General',
                  properties:[
                    {
                      extend: 'float',
                      type: 'radio',
                      default: 'none',
                      options: [
                        { value: 'none', className: 'fa fa-times'},
                        { value: 'left', className: 'fa fa-align-left'},
                        { value: 'right', className: 'fa fa-align-right'}
                      ],
                    },
                    'display',
                    { extend: 'position', type: 'select' },
                    'top',
                    'right',
                    'left',
                    'bottom',
                  ],
                }, {
                    name: 'Dimension',
                    open: false,
                    properties: [
                      'width',
                      {
                        id: 'flex-width',
                        type: 'integer',
                        name: 'Width',
                        units: ['px', '%'],
                        property: 'flex-basis',
                        toRequire: 1,
                      },
                      'height',
                      'max-width',
                      'min-height',
                      'margin',
                      'padding'
                    ],
                  },{
                    name: 'Typography',
                    open: false,
                    properties: [
                        'font-family',
                        'font-size',
                        'font-weight',
                        'letter-spacing',
                        'color',
                        'line-height',
                        {
                          extend: 'text-align',
                          options: [
                            { id : 'left',  label : 'Left',    className: 'fa fa-align-left'},
                            { id : 'center',  label : 'Center',  className: 'fa fa-align-center' },
                            { id : 'right',   label : 'Right',   className: 'fa fa-align-right'},
                            { id : 'justify', label : 'Justify',   className: 'fa fa-align-justify'}
                          ],
                        },
                        {
                          property: 'text-decoration',
                          type: 'radio',
                          default: 'none',
                          options: [
                            { id: 'none', label: 'None', className: 'fa fa-times'},
                            { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                            { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough'}
                          ],
                        },
                        'text-shadow'
                    ],
                  },{
                    name: 'Decorations',
                    open: false,
                    properties: [
                      'opacity',
                      'border-radius',
                      'border',
                      'box-shadow',
                      'background', // { id: 'background-bg', property: 'background', type: 'bg' }
                    ],
                  },{
                    name: 'Extra',
                    open: false,
                    buildProps: [
                      'transition',
                      'perspective',
                      'transform'
                    ],
                  },{
                    name: 'Flex',
                    open: false,
                    properties: [{
                      name: 'Flex Container',
                      property: 'display',
                      type: 'select',
                      defaults: 'block',
                      list: [
                        { value: 'block', name: 'Disable'},
                        { value: 'flex', name: 'Enable'}
                      ],
                    },{
                      name: 'Flex Parent',
                      property: 'label-parent-flex',
                      type: 'integer',
                    },{
                      name: 'Direction',
                      property: 'flex-direction',
                      type: 'radio',
                      defaults: 'row',
                      list: [{
                        value: 'row',
                        name: 'Row',
                        className: 'icons-flex icon-dir-row',
                        title: 'Row',
                      },{
                        value: 'row-reverse',
                        name: 'Row reverse',
                        className: 'icons-flex icon-dir-row-rev',
                        title: 'Row reverse',
                      },{
                        value: 'column',
                        name: 'Column',
                        title: 'Column',
                        className: 'icons-flex icon-dir-col',
                      },{
                        value: 'column-reverse',
                        name: 'Column reverse',
                        title: 'Column reverse',
                        className: 'icons-flex icon-dir-col-rev',
                      }],
                    },{
                      name: 'Justify',
                      property: 'justify-content',
                      type: 'radio',
                      defaults: 'flex-start',
                      list: [{
                        value: 'flex-start',
                        className: 'icons-flex icon-just-start',
                        title: 'Start',
                      },{
                        value: 'flex-end',
                        title: 'End',
                        className: 'icons-flex icon-just-end',
                      },{
                        value: 'space-between',
                        title: 'Space between',
                        className: 'icons-flex icon-just-sp-bet',
                      },{
                        value: 'space-around',
                        title: 'Space around',
                        className: 'icons-flex icon-just-sp-ar',
                      },{
                        value: 'center',
                        title: 'Center',
                        className: 'icons-flex icon-just-sp-cent',
                      }],
                    },{
                      name: 'Align',
                      property: 'align-items',
                      type: 'radio',
                      defaults: 'center',
                      list: [{
                        value: 'flex-start',
                        title: 'Start',
                        className: 'icons-flex icon-al-start',
                      },{
                        value: 'flex-end',
                        title: 'End',
                        className: 'icons-flex icon-al-end',
                      },{
                        value: 'stretch',
                        title: 'Stretch',
                        className: 'icons-flex icon-al-str',
                      },{
                        value: 'center',
                        title: 'Center',
                        className: 'icons-flex icon-al-center',
                      }],
                    },{
                      name: 'Flex Children',
                      property: 'label-parent-flex',
                      type: 'integer',
                    },{
                      name: 'Order',
                      property: 'order',
                      type: 'integer',
                      defaults: 0,
                      min: 0
                    },{
                      name: 'Flex',
                      property: 'flex',
                      type: 'composite',
                      properties  : [{
                        name: 'Grow',
                        property: 'flex-grow',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                      },{
                        name: 'Shrink',
                        property: 'flex-shrink',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                      },{
                        name: 'Basis',
                        property: 'flex-basis',
                        type: 'integer',
                        units: ['px','%',''],
                        unit: '',
                        defaults: 'auto',
                      }],
                    },{
                      name: 'Align',
                      property: 'align-self',
                      type: 'radio',
                      defaults: 'auto',
                      list: [{
                        value: 'auto',
                        name: 'Auto',
                      },{
                        value: 'flex-start',
                        title: 'Start',
                        className: 'icons-flex icon-al-start',
                      },{
                        value   : 'flex-end',
                        title: 'End',
                        className: 'icons-flex icon-al-end',
                      },{
                        value   : 'stretch',
                        title: 'Stretch',
                        className: 'icons-flex icon-al-str',
                      },{
                        value   : 'center',
                        title: 'Center',
                        className: 'icons-flex icon-al-center',
                      }],
                    }]
                  }
                ],
              },
            },
          });
    
          window.editor = editor;
    
          editor.setComponents(LandingPage.html);
          editor.setStyle(LandingPage.style);
    
    
          
          editor.I18n.addMessages({
            en: {
              styleManager: {
                properties: {
                  'background-repeat': 'Repeat',
                  'background-position': 'Position',
                  'background-attachment': 'Attachment',
                  'background-size': 'Size',
                }
              },
            }
          });
    
          var pn = editor.Panels;
          var modal = editor.Modal;
          var cmdm = editor.Commands;
          cmdm.add('canvas-clear', function() {
            if(confirm('Are you sure to clean the canvas?')) {
              var comps = editor.DomComponents.clear();
              setTimeout(function(){ localStorage.clear()}, 0)
            }
          });
          cmdm.add('set-device-desktop', {
            run: function(ed) { ed.setDevice('Desktop') },
            stop: function() {},
          });
          cmdm.add('set-device-tablet', {
            run: function(ed) { ed.setDevice('Tablet') },
            stop: function() {},
          });
          cmdm.add('set-device-mobile', {
            run: function(ed) { ed.setDevice('Mobile portrait') },
            stop: function() {},
          });
    
    
    
    
    
   
    
    // pn.addButton('options', {
    //     id: 'open-templates',
    //     className: 'fa fa-folder-o',
    //     attributes: {
    //         title: 'Open projects and templates'
    //     },
    //     command: 'open-templates', //Open modal 
    // });
    // pn.addButton('views', {
    //     id: 'open-pages',
    //     className: 'fa fa-file-o',
    //     attributes: {
    //         title: 'Take Screenshot'
    //     },
    //     command: 'open-pages',
    //     togglable: false
    // });
    
    
    
          // Add info command
          var mdlClass = 'gjs-mdl-dialog-sm';
          var infoContainer = document.getElementById('info-panel');
          cmdm.add('open-info', function() {
            var mdlDialog = document.querySelector('.gjs-mdl-dialog');
            mdlDialog.className += ' ' + mdlClass;
            infoContainer.style.display = 'block';
            modal.setTitle('About this demo');
            modal.setContent(infoContainer);
            modal.open();
            modal.getModel().once('change:open', function() {
              mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
            })
          });
          // pn.addButton('options', {
          //   id: 'open-info',
          //   className: 'fa fa-question-circle',
          //   command: function() { editor.runCommand('open-info') },
          //   attributes: {
          //     'title': 'About',
          //     'data-tooltip-pos': 'bottom',
          //   },
          // });
    
    
    
    
    
    
    
    
                // Add info command
                // var mdlClass = 'gjs-mdl-dialog-sm';
          // var publishContainer = document.getElementById('publish-panel');
          // var loginContainer = document.getElementById('login-panel');
          // cmdm.add('open-deploy', function() {
          //   var mdlDialog = document.querySelector('.gjs-mdl-dialog');
          //   mdlDialog.className += ' ' + mdlClass;
          //   loginContainer.style.display = 'block';
          //   modal.setTitle('Publish to IPFS (Free)');
          //   modal.setContent(loginContainer);
          //   modal.open();
          //   modal.getModel().once('change:open', function() {
          //     mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
          //   })
          // });
          // pn.addButton('options', {
          //   id: 'open-deploy',
          //   className: 'fa fa-rocket',
          //   command: function() { editor.runCommand('open-deploy') },
          //   attributes: {
          //     'title': 'Publish',
          //     'data-tooltip-pos': 'bottom',
          //   },
          // });
    
          pn.addButton('options', {
            id: 'open-deploy',
            className: 'fa fa-rocket',
            command: function() { 
              let user = Moralis.User.current();
              editor.select( null );
              editor.stopCommand('sw-visibility'); 
              $(".gjs-pn-btn, .fa, .fa-square-o, .gjs-four-color").removeClass('gjs-pn-active');
              // if ('sw-visibility' in editor.Commands.getActive()) {
              //   // sw-visibility is active
              //   // $('#current-email').text(user.get('email'))
              //   console.log("gg?")
              //   $("select[title='View components']").click();
                
              // }
                console.log(user);
    
              if (user) {
                console.log(user);
                $('.modal-title').html('Ready to publish?');
                $('.modal-body').html(PublishModal);
                $('#current-email').text(user.get('email'))
                $('#modal-view').modal('show');
              } else {
                // $( "#data" ).load( "https://www.quackit.com/jquery/tutorial/latestData.html #dataList" );
                // $('.gjs').load( "./views/modal/modal4.html #modalis");
                // $('#login-panel').modal('show');
            

                  // $("#container").load('./views/modal/modal4.html').appendTo("body");
                  // $('#mmdd').load('./views/modal/modal4.html',function(){

                    // window.history.pushState(null,null,'/login');
                    // $('#login-panel').modal('show');
                  // });

                  $('.modal-title').html('Please Login');
                  $('.modal-body').html(LoginModal);
                  $('#modal-view').modal('show');
                // });

                    
      
              // }});


                // $('body').load('./templates/modal4.html');
                
              }
              
            },
            attributes: {
              'title': 'Publish',
              'data-tooltip-pos': 'bottom',
            },
          });
    
    
    
    
    
    
          // Simple warn notifier
          var origWarn = console.warn;
          toastr.options = {
            closeButton: true,
            preventDuplicates: true,
            showDuration: 250,
            hideDuration: 150
          };
          console.warn = function (msg) {
            if (msg.indexOf('[undefined]') == -1) {
              toastr.warning(msg);
            }
            origWarn(msg);
          };
    
    
          // Add and beautify tooltips
          [['sw-visibility', 'Show Borders'], ['preview', 'Preview'], ['fullscreen', 'Fullscreen'],
           ['export-template', 'Export'], ['undo', 'Undo'], ['redo', 'Redo'],
           ['gjs-open-import-webpage', 'Import'], ['canvas-clear', 'Clear canvas']]
          .forEach(function(item) {
            pn.getButton('options', item[0])?.set('attributes', {title: item[1], 'data-tooltip-pos': 'bottom'});
          });
          [['open-sm', 'Style Manager'], ['open-layers', 'Layers'], ['open-blocks', 'Blocks']]
          .forEach(function(item) {
            pn.getButton('views', item[0])?.set('attributes', {title: item[1], 'data-tooltip-pos': 'bottom'});
          });
          var titles = document.querySelectorAll('*[title]');
    
          for (var i = 0; i < titles.length; i++) {
            var el = titles[i];
            var title = el.getAttribute('title');
            title = title ? title.trim(): '';
            if(!title)
              break;
            el.setAttribute('data-tooltip', title);
            el.setAttribute('title', '');
          }
    
    
          // Store and load events
          editor.on('storage:load', function(e) { console.log('Loaded ', e) });
          editor.on('storage:store', function(e) { console.log('Stored ', e) });
    
    
          // Do stuff on load
          editor.on('load', function() {
            var $ = grapesjs.$;
    
            // Show borders by default
            pn.getButton('options', 'sw-visibility').set('active', 1);
    
            // Show logo with the version
            // var logoCont = document.querySelector('.gjs-logo-cont');
            // document.querySelector('.gjs-logo-version').innerHTML = 'v' + grapesjs.version;
            // var logoPanel = document.querySelector('.gjs-pn-commands');
            // logoPanel.appendChild(logoCont);
    
    
            // Load and show settings and style manager
            var openTmBtn = pn.getButton('views', 'open-tm');
            openTmBtn && openTmBtn.set('active', 1);
            var openSm = pn.getButton('views', 'open-sm');
            openSm && openSm.set('active', 1);
    
            // Add Settings Sector
            var traitsSector = $('<div class="gjs-sm-sector no-select">'+
              '<div class="gjs-sm-sector-title"><span class="icon-settings fa fa-cog"></span> <span class="gjs-sm-sector-label">Settings</span></div>' +
              '<div class="gjs-sm-properties" style="display: none;"></div></div>');
            var traitsProps = traitsSector.find('.gjs-sm-properties');
            traitsProps.append($('.gjs-trt-traits'));
            $('.gjs-sm-sectors').before(traitsSector);
            traitsSector.find('.gjs-sm-sector-title').on('click', function(){
              var traitStyle = traitsProps.get(0).style;
              var hidden = traitStyle.display == 'none';
              if (hidden) {
                traitStyle.display = 'block';
              } else {
                traitStyle.display = 'none';
              }
            });
    
            // Open block manager
            var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
            openBlocksBtn && openBlocksBtn.set('active', 1);
    
            // Move Ad
            // $('#gjs').append($('.ad-cont'));
          });
    
    
    
    
        //   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        //   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        //   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        //   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    
        //   ga('create', 'UA-74284223-1', 'auto');
        //   ga('send', 'pageview');


        


// const serverUrl = process.env.SERVER_URL;
// const appId = process.env.APP_ID;
// console.log(appId);
// Moralis.start({ serverUrl, appId });

// $("#gjs").load("./template.html");

window.handleAuth = async (e) => {
  e.preventDefault();
  // alert("The form was submitted");


  var inputs = document.getElementById("signin-form").elements;
var inputByName = inputs["email"]
console.log(inputByName.value);

  let user = Moralis.User.current();
  console.log(user);
    if (!user) {
      $("#wait-link-btn").removeClass('d-none');
      $("#submit-link-btn").addClass('d-none');
      const provider = "magicLink";
      const props = {
        signingMessage: "Dappify wants to connect!",
        provider: provider,
        email: inputByName.value,
        apiKey: process.env.MAGIC,
        network: "ropsten",
      }
      user = await Moralis.authenticate(props)

      if (!user.get('email')) {
        try {
          user.set('email', props.email);
          user.set('provider', provider);
          await user.save();
        } catch (e) {
          console.log(e);
        }
      }
      console.log("logged in user:", user);
      console.log(user.get("ethAddress"));

      $('.modal-title').html('Ready to publish?');
      $('.modal-body').html(PublishModal);
      $('#current-email').text(user.get('email'))
      $('#modal-view').modal('show');

      // $('#login-panel').modal('hide');
      // $('#current-email').text(props.email)
      // $('#publish-panel').modal('show');

      // $("#submit-link-btn").removeClass('d-none');
      // $("#wait-link-btn").addClass('d-none');

    }

}

window.handleSwitchAccount = async () => {

  // alert("The form was submitted");
  await Moralis.User.logOut();


  $('.modal-title').html('Please Login');
  $('.modal-body').html(LoginModal);
  $('#modal-view').modal('show');
}


window.handlePublishToIpfs = async (e) => {
  // console.log(e);
        // e.preventDefault();
        console.log("publishing");
        const editor = window.editor;
        console.log(editor);
        var Html = editor.getHtml();
        var Css = editor.getCss();
        // console.log(Html);
        // console.log(Css);

    const s = `width: 120px;
    height: 24px;
    position: fixed;
    bottom: 15px;
    right: 15px;
    font-size: 12px;
    padding: 2px 4px 4px 4px;
    text-align: center;
    border: 1px solid #e1e1e1;
    border-radius: 5px 5px 5px 5px;
    background-repeat: repeat;
    background-position: center center;
    background-attachment: scroll;
    background-size: contain;
    color: #333333;
    opacity: 0.6;
    box-shadow: 3px 3px 5px 0 #a4a4a4;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX8/vz///+pqqkpKikrKysZGRkaGxqwsrCsrawAAAAcHByWl5aLjYsgICCAgYB4eXhxcnHvFLQZAAABSUlEQVR4nO3ay20CQQBEwdllgfEH4/yjNRkgIflQw6sAWnr3Hh/n4/TU59fcXzO/b8/n/9FxGeexLe06jm2sbNvHqUJbhb4KfRX6KvRV6KvQV6GvQl+Fvgp9Ffoq9FXoq9BXoa9CX4W+Cn0V+ir0Veir0PcWhbflC3+WL5zLF+4V2ir0Veir0Fehr0Jfhb4KfRX6KvRV6KvQV6GvQl+Fvgp9Ffoq9L3FU+G+fOH6j6H1X18V4ir0Veir0Fehr0Jfhb4KfRX6KvRV6KvQV6GvQl+Fvgp9Ffoq9FXoq9BXoa9CX4W+Cn0V+ir0Veir0Fehr0Jfhb4KfRX6KvRV6KvQV6GvQl+Fvgp9Ffoq9FXoq9BXoa9CX4W+Cn0V+ir0Veir0Fehr0Jfhb4KfRX6KvRV6KvQV6GvQl+Fvgp9Ffoehce2tjku131l8/cP3ZYMd7f8Rg4AAAAASUVORK5CYII=);`

        const index = `
          <!doctype html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" crossorigin="anonymous">
              <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
              <script src="https://unpkg.com/moralis/dist/moralis.js"></script>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
              <script src="https://cdnjs.cloudflare.com/ajax/libs/ethers/5.6.9/ethers.umd.min.js" integrity="sha512-Veaz5IU2iRpa0BBrJlJeRgfJ7OAHWtVJZTXvgdH7s3ffsLUChllMCqC0Bb+eeRxGlrZ06iYIE/R3KsciCrgv3A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
              <style tyle="text/css">${Css}</style>
            </head>
            ${Html}
          </html>`;
        
        
        
        editor.getHtml() + '<style>'+editor.getCss()+'</style>'


        const comps = index.split('</body>');
        const madeWith = `<div id="made-with" style="${s}">Made with Dappify</div>`
        const full = comps[0] + madeWith + comps[1];
        saveStaticDataToFile(index, 'index.html')
      }

      const saveStaticDataToFile = (data, name) => {
//         console.log(data);

//         var frame = document.querySelector(".gjs-frame");

//         console.log(frame.innerHTML);
// var content = frame.contentDocument;

// console.log(content.html());

// console.log()  

        // const serialized = new XMLSerializer().serializeToString(content);
        // console.log(serialized.xml);
        console.log(data);
            var blob = new Blob([data],
                { type: "text/plain" });
                // const ipfs = window.IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001 })

// console.log(blob);
// return;

                const file = new Moralis.File(data.name, blob);

                $("#publish-btn").addClass('d-none');
                $("#wait-publish-btn").removeClass('d-none');

                file.saveIPFS().then((f) => {
                  console.log(f);
                  console.log(f.ipfs())
                  console.log(f.hash())


                  $('#publish-panel').modal('hide');
                  


                  $('.modal-title').html('Congrats!');
                  $('.modal-body').html(ConfirmationModal);

                  $("#project-url").attr("href", f.ipfs());
                  $("#project-url").text(`ipfs/${f.hash()}`);
                  $('#modal-view').modal('show');



                  $("#publish-btn").removeClass('d-none');
                  $("#wait-publish-btn").addClass('d-none');


                  try {
                    const currentUser = Moralis.User.current();
                    console.log(currentUser);
                    // Now save in Moralis
                    const Project = Moralis.Object.extend('Site');
                    const project = new Project();

                    project.set('user', currentUser);
                    project.set('url', f.ipfs());
                    project.set('hash', f.hash());

                    project.save();
                  } catch(e) {
                    console.log(e);
                  }


                });

//console.log(file.ipfs(), file.hash())


                // document.getElementById("ipfs_hash").innerHTML = "<b>Uploading...Please wait</b>"
                // ipfs.add(data, (err, result) => {
                //   console.log(result)
                //   document.getElementById("ipfs_hash").innerHTML = "<b>IPFS Hash of uploded file: </b>"+result[0].hash 
                // })

        }