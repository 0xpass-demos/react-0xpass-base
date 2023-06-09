import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

import '0xpass/style.css';
import {PassProvider, connectorsForWallets, createClient} from "0xpass";
import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {mainnet, polygon, optimism, arbitrum, goerli} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';
import App from './App';
import { metaMaskWallet, rainbowWallet, emailMagicWallet, ledgerWallet } from "0xpass/wallets";

const {chains, publicClient, webSocketPublicClient} = configureChains(
    [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : []),
    ],
    [publicProvider()]
);


const projectId = "2d525ce8aa6e9dae52c99472ce6650bc"
//const apiKey = "" //enter your 0xpass key here


const connectors = connectorsForWallets([
    {
        groupName: "Social",
        wallets: [
            // emailMagicWallet({ apiKey: "your magic key", chains }),
        ],
    },
    {
        groupName: "EOA",
        wallets: [
            metaMaskWallet({projectId, chains}),
            rainbowWallet({projectId, chains}),
            ledgerWallet({projectId, chains}),
        ],
    },
]);

const wagmiConfig = createConfig({
    connectors,
    publicClient,
    webSocketPublicClient,
});


const passClient = createClient({
    apiKey: apiKey,
    chains,
});


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <WagmiConfig config={wagmiConfig}>
            <PassProvider client={passClient}>
                <App/>
            </PassProvider>
        </WagmiConfig>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
