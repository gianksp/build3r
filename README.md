# Build3r✨
#### https://build3r.cc/

## A HackFS 2022 Project

## What is it?

Build3r is a multi-purpose web dApp builder platform with composable modules, similar to “legos”, that users drag and drop into a canvas for a  WYSIWYG experience. These modules are composable and interoperable meaning they can talk to each other.

## Project goals

- Ease of use. Demonstrate that blockchain or development experience are not needed to create dApps.
- Composability & Interoperability. Demonstrate the power of multiple sponsor technologies working together instead of siloed for
- Showcase the power of allowing developers to create micro modules that can wrap part of the functionalities offered by their tech stack into a real use case

Build3r lowers the entry barrier to creating dApps by allowing anyone to become a builder. It abstracts users of the complexity of coding and blockchain domain specific protocols. The tool allows them to drag and drop components into a canvas which are interactive and leverage different tech stacks that become interoperable via Web events.

This project is a fork of Grapesjs https://grapesjs.com/ designed to work using decentralised tech stack e.g deploy projects to IPFS. Each module is enhanced and enriched to be able to communicate with other modules via custom Web events that allow different services and providers to communicate, enhancing interoperability and composability via no-code drag and drop editor.

While other editors may allow drag and drop and no-code composability, the power of build3r comes from:

- Interoperability. Modules can communicate between each other, increasing the value proposition of the applications built on top, for example, by adding the TheGraphChart module and the PriceContext module, items in the chart pulled from data from TheGraph, can display pricing in USD thanks to the context provided by PriceContext module using Covalent pricing API.
- Micro-modules are simple enough that other developers can create quickly integrations. This is useful for emerging technologies willing to expand their user base since now they can consider any person without coding skills or blockchain expertise a potential user.
- Next step is to enable developers to upload modules and for users to save and share full templates leveraging such modules.


## Sponsors used


- IPFS: All projects are deployed to IPFS, it is the first time a no-code building platform has allowed such complex applications being deployed from drag and drop building, we are talking about multi stack, interoperable and interactive dApps.
- Polygon: The module Smart Contract UI has the same ability as HyperDapp to offer creating frontends for smart contacts. You need to provide an ABI, target method, contract address and now you can interact with the smart contract from the dApp. Example demo uses an NFT contract deployed in Polygon that allows anyone to mint NFTs.
- Covalent: The module Price Context is able to inject into the build3r context pricing in USD for tokens that other modules can leverage to translate token specific pricing. For example, you can drag into the canvas the Chart addon that renders prices of last auctioned NFTs and by including this module, prices will be displayed in USD instead of wei.
- NFTPort: a module to simply add an NFT search by topic to the canvas. Useful as it allows a proof of concept on how full NFT marketplaces could be built using the platform.
- XMTP: with this protocol I built a chat widget similar to the one intercom uses to enable website visitors chat and obtain support from the site admins, but fully decentralized!!!
- TheGraph: implemented a drag and drop module that uses Chart.js to display any type of chart fed by subgraph data and that can be configured by users.

## The stack

UI and modules

### Frontend

The framework is a fork of Grapesjs https://grapesjs.com/ designed for decentralised interactions. GrapesJS is a free and open source Web Builder Framework which helps building HTML templates. All projects are deployed to IPFS and the site is hosted in Firebase.

This is where the interesting part comes, creating wrapper for each of the sponsors technologies to demonstrate how they work together in synergy for a simple app use case.

Full source code can be found in https://github.com/gianksp/build3r

### Modules

I created a module for build3r for some of the sponsors to showcase their value as a no-code module in build3r and also to showcase how they can interact and communicate with other modules via Web events.

#### Covalent (Price Context)

https://github.com/gianksp/build3r/blob/master/src/modules/CovalentPriceContext.js

This module is capable of injecting price context so other components can translate token native prices to USD

#### NFTPort (NFT Search)

https://github.com/gianksp/build3r/blob/master/src/modules/NFTSearch.js

This module is capable of searching NFTs by topic or filtering within a specific collection

#### Polygon (Smart Contract UI)

https://github.com/gianksp/build3r/blob/master/src/modules/SmartContractUI.js

This module works in conjunction with the wallet module and is capable of allowing interactions with smart contract
methods from drag and drop modules

#### TheGraph (Chart)

https://github.com/gianksp/build3r/blob/master/src/modules/TheGraphChart.js

This module is able to render a Chart.js using subgraph data and is configurable to select the subgraph, dataset and chat properties

#### XMTP (Chat widget)

https://github.com/gianksp/build3r/blob/master/src/modules/XMTPWidget.js

This module is similar to the Intercom widget module, is a floating button that spawns a chat window that enables users to talk
with admins or support team and is configurable

#### IPFS (Deploy)

https://github.com/gianksp/build3r/blob/master/src/App.js#L756

All projects are packaged and deployed to IPFS, because IPFS adds certain restrictions to SPA deployed, for example, they need to have relative references to other assets within the application, packaging is a complex problem solved here by transpiling everything to vanilla js.