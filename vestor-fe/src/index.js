import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { BrowserRouter} from 'react-router-dom'

const binance= {
  id: 56,
  name: 'binance',
  network: 'binance',
  iconUrl: 'https://imgs.search.brave.com/GyGd0-bqzD-UfvB1ILdb3Rr3LaSSvBZlk8YHXvNrQn4/rs:fit:312:312:1/g:ce/aHR0cHM6Ly9tYXN0/ZXItN3JxdHd0aS12/eDVnc2Z2aTJpNGNl/LnVzLTIucGxhdGZv/cm1zaC5zaXRlL3Np/dGVzL2RlZmF1bHQv/ZmlsZXMvMjAyMC0w/Ny9iaW5hbmNlLWNv/aW4tYm5iLWxvZ28x/LnBuZw',
  nativeCurrency: {
    name: 'BINANCE SMART CHAIN',
    symbol: 'BNB',
    decimals: 18
  },
  rpcUrls: {

    default: 'https://bsc-dataseed1.defibit.io'
  },
  blockExplorers: {
    etherscan: { name: 'bsc', url: 'https://bscscan.com' },
    default: { name: 'bsc', url: 'https://bscscan.com' }
  }
};

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum,chain.localhost,binance],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

ReactDOM.render(
 <BrowserRouter>
  <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
          <App/>
      </RainbowKitProvider>
    </WagmiConfig>
</BrowserRouter>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
