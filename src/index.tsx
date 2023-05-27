import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

import '0xpass/style.css';
import { PassProvider, connectorsForWallets, createClient } from "0xpass";
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';
import {ledgerWallet, metaMaskWallet, googleMagicWallet} from "0xpass/wallets";



const projectId = "dummuy"
const apiKey = "dummy"


const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [publicProvider()]
);

const passClient=createClient({
    apiKey: apiKey,
    chains,
});

const connectors = connectorsForWallets([
    {
        groupName: "Social",
        wallets: [
            // To use magic wallet, do enable magic sdk and add creds on ui
            // googleMagicWallet({
            //     chains,
            //     apiKey: apiKey,
            // }),
        ],
    },
    {
        groupName: "Others",
        wallets: [
            metaMaskWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    connectors: connectors,
    publicClient,
});



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <WagmiConfig config={wagmiConfig}>
      <PassProvider client={passClient}>
        <App />
      </PassProvider>
    </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
