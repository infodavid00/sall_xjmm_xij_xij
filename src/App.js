import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";
import React from "react";
import styled from "styled-components";
import HomePage from "./pages/Home";

const Body = styled.div`
    position: relative;
`;

const projectId = "72144217ccaab12d01cbdde6f9406274";

const chains = [mainnet, polygon, optimism];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ chains, projectId }),
    publicClient,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const App = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    return (
        <>
            {ready ? (
                <WagmiConfig config={wagmiConfig}>
                    <Body>
                        <HomePage />
                    </Body>
                </WagmiConfig>
            ) : null}
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    );
};

export default App;
