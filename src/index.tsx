import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';

import '0xpass/styles.css';
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

// all configs here
const connectWalletProjectId = "1ccaf857ab73b97e10a5a333aab8edaf"  //obtained from https://cloud.walletconnect.com/sign-in
const OxpassApiKey = "mykey" //enter your 0xpass key obtained from https://0xpass.io/register
const magicPublicKey = "pk_live_262C7B7D9D959DBA" //obtained from https://dashboard.magic.link/signup


const connectors = connectorsForWallets([
    // {
    //     groupName: "Social",
    //     wallets: [
    //         emailMagicWallet({ apiKey: magicPublicKey, chains }),
    //     ],
    // },
    {
        groupName: "EOA",
        wallets: [
            metaMaskWallet({projectId: connectWalletProjectId, chains}),
            rainbowWallet({projectId: connectWalletProjectId, chains}),
            ledgerWallet({projectId: connectWalletProjectId, chains}),
        ],
    },
]);

const wagmiConfig = createConfig({
    connectors,
    publicClient,
    webSocketPublicClient,
});


const passClient = createClient({
    apiKey: OxpassApiKey,
    chains,
});


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        {
            OxpassApiKey
            &&
            <WagmiConfig config={wagmiConfig}>
                <PassProvider client={passClient}>
                    <App/>
                </PassProvider>
            </WagmiConfig>
        }
        {
            !OxpassApiKey
            &&
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e8e2e2', padding: '20px', margin: '30vh 0 0 0' }}>
                <h2 style={{ color: '#cc0000', fontSize: '25px' }}>0xpass API key not entered</h2>
                <br/>
                <p>Step 1: Sign up on <a style={{ color: 'blue'}} href="https://0xpass.io/register"> 0xpass </a></p>
                <p>Step 2: Create project and obtain key </p>
                <p>Step 3: Replace API Key on Line 28 of code in index.tsx</p>
            </div>

        }


    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
