import React, { useState, useReducer, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEquals, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";
import ABI from "../../assets/ABI.json";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spinner from "../../components/Spinner";
import Toast from "../../components/Toast";
import { initialState } from "../../state";
import reducer from "../../state/reducer";
import logo from "../../assets/logo.png";
import { CONTRACT_ADDRESS } from "../../assets/env";
import Swal from "sweetalert2";
import Accreditation from "../accreditation/Accreditation.jsx";
import {acc_lc_key} from "../accreditation/endpoint.jsx";
// import { Web3Modal } from "@web3modal/react";
// import { useAccount, useConnectModal } from "@web3modal/react";
// import { chains } from "@web3modal/ethereum";
// import { useSigner } from "@web3modal/react";

import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect, useWalletClient } from "wagmi";

const NavFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    position: ${(props) => props.position || "absolute"};
    left: 0;
    right: 0;
    top: ${(props) => props.top || "-40px"};
    background-color: ${(props) => props.backgroundColor || "#f7fbff"};
    margin-top: ${(props) => props.marginTop || 0};
    padding: 0px 5%;
    height: 75px;
    box-shadow: ${(props) => props.boxShadow || "none"};
    @media screen and (max-width: 920px) {
        gap: 5px;
        padding: 0px 10px;
    }
    @media screen and (max-width: 660px) {
        gap: 0px;
    }
`;

const Spacer = styled.div`
    flex: 0 1;
`;

const NavCenterFlex = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin-right: auto;
    gap: 30px;
    margin-top: ${(props) => props.marginTop || 0};
    padding: ${(props) => props.padding || 0};
    @media screen and (max-width: 720px) {
        gap: 0px;
    }
`;
const CenterFlex = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: ${(props) => props.gap || 0};
    width: ${(props) => props.width || "auto"};
    margin-top: ${(props) => props.marginTop || 0};
    padding: ${(props) => props.padding || 0};
    background: ${(props) => props.background || "none"};
    @media screen and (max-width: 720px) {
        flex-wrap: nowrap;
    }
`;
const BuyContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: ${(props) => props.marginTop || "50px"};
    padding: 35px 25px;
    background-color: #fff;
    max-width: 500px;
    margin: 0 auto;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px,
        rgba(0, 0, 0, 0.06) 0px 3px 6px 0px;
    @media screen and (max-width: 720px) {
        padding: 35px 5%;
        margin: 0 10px;
    }
`;

const SpanText = styled.span`
    font-size: ${(props) => props.fontSize || "13px"};
    font-weight: ${(props) => props.fontWeight || "normal"};
    font-style: ${(props) => props.fontStyle || "normal"};
    color: ${(props) => props.color || "black"};
    padding: ${(props) => props.padding || 0};

    @media screen and (max-width: 360px) {
        font-size: ${(props) =>
            props.mobileFontSize || props.fontSize || "13px"};
        padding: ${(props) => props.mobilePadding || props.padding || 0};
    }
`;
const ParaText = styled.p`
    font-size: ${(props) => props.fontSize || "13px"};
    font-weight: ${(props) => props.fontWeight || "normal"};
    font-style: ${(props) => props.fontStyle || "normal"};
    color: ${(props) => props.color || "black"};
    padding: ${(props) => props.padding || 0};
    text-align: ${(props) => props.textAlign || "left"};

    @media screen and (max-width: 360px) {
        font-size: ${(props) =>
            props.mobileFontSize || props.fontSize || "13px"};
        padding: ${(props) => props.mobilePadding || props.padding || 0};
    }
`;

const NavAnchorLink = styled.a`
    font-size: ${(props) => props.fontSize || "13px"};
    font-weight: ${(props) => props.fontWeight || "normal"};
    font-style: ${(props) => props.fontStyle || "normal"};
    color: ${(props) => props.color || "black"};
    padding: ${(props) => props.padding || 0};
    text-decoration: none;
    @media screen and (max-width: 660px) {
        font-size: 13px;
        margin-bottom: 3px;
    }
`;
const AnchorLink = styled.a`
    font-size: ${(props) => props.fontSize || "13px"};
    font-weight: ${(props) => props.fontWeight || "normal"};
    font-style: ${(props) => props.fontStyle || "normal"};
    color: ${(props) => props.color || "black"};
    padding: ${(props) => props.padding || 0};
    text-decoration: none;
    @media screen and (max-width: 660px) {
        font-size: 13px;
    }
`;

const DisclaimerBar = styled.div`
    background-color: #333; // or any color that matches your site's design
    color: white;
    text-align: center;
    padding: 18px;
    font-size: 14px;
`;

const ModalBackground = styled.div`
    display: ${(props) => (props.show ? "flex" : "none")};
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
`;

const CloseModalButton = styled.button`
    background-color: transparent;
    border: none;
    float: right;
    font-size: 1.5em;
    cursor: pointer;
`;

const Separator = styled.span`
    margin: 0 5px; /* Adjust the 8px to increase or decrease the space as desired */
`;

const DivInCenterFlex = styled.div`
    margin: ${(props) => props.margin || "0"};
`;

const FaArrowsAltH = styled(FontAwesomeIcon)`
    font-size: ${(props) => props.fontSize || "12px"};
`;

const Image = styled.img`
    width: ${(props) => props.width || "90px"};
    height: ${(props) => props.height || "90px"};
    border-radius: ${(props) => props.borderRadius || "50%"};
    object-fit: contain;
    @media screen and (max-width: 660px) {
        width: ${(props) => props.mobileWidth || props.width || "120px"};
        height: ${(props) => props.mobileHeight || props.height || "90px"};
    }
`;

const Ul = styled.ul`
    list-style-type: none;
    margin: ${(props) => props.margin || "0"};
    padding: ${(props) => props.padding || "0"};

    @media screen and (max-width: 360px) {
        padding: ${(props) => props.mobilePadding || props.padding || "0"};
        margin: ${(props) => props.mobileMargin || props.margin || "0"};
    }
`;

const explorer =
    process.env.NODE_ENV !== "production"
        ? "https://testnet.bscscan.com/tx/"
        : "https://bscscan.com/tx/";

const Home = () => {
    const [shouldShowAccreditation, setshouldShowAccreditation] = 
      useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);
    const [bnbAmount, setBNBAmount] = useState(0.01);
    const [daysLeft, setDaysLeft] = useState("0");
    const [hoursLeft, setHoursLeft] = useState("0");
    const [minutesLeft, setMinutesLeft] = useState("0");
    const [secondsLeft, setSecondsLeft] = useState("0");
    const [presaleContract, setPresaleContract] = useState(null);
    const [buyLoading, setBuyLoading] = useState(false);
    const [errorToast, setErrorToast] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [nav, fixNav] = useState(false);
    const account = useAccount();
    const { open } = useWeb3Modal();
    const tokenAddress = "0x9Aab6f0f8240590e6D973A8E84ACD759a99cC08f";
    const tokenSymbol = "SALL";
    const tokenDecimals = 18;
    const tokenImage = "https://bscscan.com/token/images/systemofall_32.png";
    const { data, isLoading, refetch } = useWalletClient({ chainId: 56 });
    const disconnect = useDisconnect();
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    const MINIMUM_BNB = 0.001; // Define the minimum BNB amount

    useEffect(() => {
        loadTime();
        getRate();
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                fixNav(true);
            } else fixNav(false);
        });
        return () => {
            window.removeEventListener("scroll", fixNav(false));
        };
    }, []);

    const setAccount = (account) =>
        dispatch({
            type: "ACCOUNT_SET",
            payload: account,
        });

    const setRate = (rate) =>
        dispatch({
            type: "RATE_SET",
            payload: rate,
        });

    const handleBNBInputChange = (e) => setBNBAmount(e.target.value);

// TODO: FUNCTION ONCLICK OF THE CONNECT METAMASK BUTTON
    const requestAccounts = async () => {
      const Lkey = localStorage.getItem("acc_lc_key");
      if (Lkey && JSON.parse(Lkey).key === acc_lc_key) {
        if (account.isConnected == false) {
            await open();
            setAccount(account.address);
        } else {
            disconnect();
        }
      } else {
        setshouldShowAccreditation(true)
      }
    };
// TODO: FUNCTION ONCLICK OF THE CONNECT METAMASK BUTTON

    const loadTime = async () => {
        const jsDate = new Date("Nov 4, 2024 6:49:00").getTime();
        const x = setInterval(() => {
            const now = new Date().getTime();
            const diff = jsDate - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            const daysAsString = days.toFixed(0);
            const hoursAsString = hours.toFixed(0);
            const minutesAsString = minutes.toFixed(0);
            const secondsAsString = seconds.toFixed(0);
            setDaysLeft(daysAsString);
            setHoursLeft(hoursAsString);
            setMinutesLeft(minutesAsString);
            setSecondsLeft(secondsAsString);

            if (diff < 0) {
                clearInterval(x);
                setDaysLeft("0");
                setHoursLeft("0");
                setMinutesLeft("0");
                setSecondsLeft("0");
            }
        }, 1000);
    };

    const getRate = async () => {
        if (window.ethereum) {
            let provider = new ethers.providers.JsonRpcProvider(
                "https://bsc-dataseed1.binance.org/"
            );
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                ABI,
                provider
            );
            const rate1 = await contract.RATE();
            const rate = ethers.utils.formatEther(rate1) * 10 ** 18;
            console.log(rate);
            setRate(rate);
        }
    };

    const buy = async () => {
        const amount = parseFloat(bnbAmount);

        // Check for minimum amount
        if (isNaN(amount) || amount < MINIMUM_BNB) {
            Swal.fire(
                "Minimum Amount Required",
                `The minimum amount should be ${MINIMUM_BNB} BNB`,
                "error"
            );
            return;
        }

        // Check if the user's wallet is connected
        if (!account.isConnected) {
            Swal.fire(
                "Wallet Not Connected",
                "Please connect your wallet to proceed.",
                "warning"
            );
            return;
        }

        setBuyLoading(true);

        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const signer = provider.getSigner();
                const userAddress = await signer.getAddress();
                const userBalance = await provider.getBalance(userAddress);
                const network = await provider.getNetwork();

                // Convert the BNB amount to the appropriate format
                const valueToSend = ethers.utils.parseEther(
                    bnbAmount.toString()
                );

                // Check if connected to BSC Mainnet
                if (network.chainId !== 56) {
                    setErrorToast(true);
                    setToastMessage("Please connect to the BSC Mainnet");
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000); // Hide toast after 5 seconds
                    setBuyLoading(false);
                    return;
                }

                // Check for sufficient balance
                if (userBalance.lt(valueToSend)) {
                    Swal.fire(
                        "Insufficient BNB Balance",
                        "You have insufficient BNB to complete this transaction.",
                        "error"
                    );
                    setBuyLoading(false);
                    return;
                }

                const contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    ABI,
                    signer
                );

                // You may want to estimate gas before sending the transaction
                // const gasEstimate = await contract.estimateGas.buyTokens({ value: valueToSend });

                const tx = await contract.buyTokens({ value: valueToSend });
                await tx.wait(); // Wait for the transaction to be mined

                Swal.fire("Success!", "Transaction successful!", "success");
            }
        } catch (error) {
            setBuyLoading(false);

            if (error.code === 4001) {
                // User rejected the transaction
                Swal.fire(
                    "Transaction Rejected",
                    "You have rejected the transaction.",
                    "error"
                );
            } else {
                // Handle other errors
                Swal.fire(
                    "Transaction Failed",
                    `Transaction failed: ${(error, "Something Went Wrong!")}`,
                    "error"
                );
            }
            console.error("Transaction error:", error);
        } finally {
            setBuyLoading(false); // Ensure that loading state is reset
        }
    };

    // useEffect()

    return (
        <>
           {shouldShowAccreditation !== false ? <Accreditation /> : ( 
           <>
           <DisclaimerBar>
                Don’t invest unless you’re prepared to lose all the money you
                invest. This is a high-risk investment and you should not expect
                to be protected if something goes wrong.{" "}
                <a
                    onClick={toggleModal}
                    style={{
                        color: "#315399",
                        cursor: "pointer",
                        textDecoration: "underline",
                    }}
                >
                    Take 2 mins to learn more.
                </a>
            </DisclaimerBar>
            <ModalBackground show={showModal} onClick={toggleModal}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    {" "}
                    {/* Prevents modal from closing when clicking inside */}
                    <CloseModalButton onClick={toggleModal}>
                        &times;
                    </CloseModalButton>
                    <h2>Investment Disclaimer</h2>
                    <p>
                        Please spare a couple of minutes to understand this
                        better. The Financial Conduct Authority (FCA)
                        categorizes this investment as high risk due to the
                        potential for losses - for the United Kingdom.
                    </p>
                    <p>What are the primary risks?</p>
                    <p>
                        1. Potential Total Loss: Crypto assets are highly
                        volatile. Their value can plummet as rapidly as it can
                        soar, and you should be ready to lose all the money you
                        invest in crypto assets. The crypto asset market is
                        mostly unregulated, and there’s a risk of losing money
                        or any crypto assets you buy due to cyber-attacks,
                        financial crime, and company failure.
                    </p>
                    <p>
                        2. Lack of Protection: The Financial Services
                        Compensation Scheme (FSCS) does not cover this type of
                        investment because it’s not a ‘specified investment’
                        under the UK regulatory regime. In other words, the FSCS
                        does not recognize this type of investment as one it can
                        protect. You can learn more by using the FSCS investment
                        protection checker:{" "}
                        <a
                            href="https://www.fscs.org.uk/check/investment-protection-checker"
                            target="blank"
                        >
                            https://www.fscs.org.uk/check/investment-protection-checker
                        </a>
                    </p>
                    <p>
                        Additionally, the Financial Ombudsman Service (FOS) will
                        not be able to handle complaints related to this firm.
                        You can learn more about FOS protection on their
                        website:{" "}
                        <a
                            href="https://www.financial-ombudsman.org.uk/consumers"
                            target="blank"
                        >
                            https://www.financial-ombudsman.org.uk/consumers
                        </a>
                    </p>
                    <p>
                        3. Sale Limitations: There’s no guarantee that
                        investments in crypto assets can be easily sold at any
                        given time. The ability to sell a crypto asset depends
                        on various factors, including market supply and demand
                        at that time. Operational issues such as technology
                        outages, cyber-attacks, and fund commingling could cause
                        unwanted delays, and you may be unable to sell your
                        crypto assets when you want.
                    </p>
                    <p>
                        4. Complexity of Crypto Asset Investments: Crypto asset
                        investments can be complex and hard to understand. You
                        should conduct your own research before investing. If
                        something appears too good to be true, it likely is.
                    </p>
                    <p>
                        5. Diversification is Key: Investing all your money into
                        a single type of investment is risky. Diversifying your
                        investments reduces your dependence on any one
                        investment doing well. A good rule of thumb is not to
                        invest more than 10% of your money in high-risk
                        investments. You can learn more about this on the FCA’s
                        website.{" "}
                        <a
                            href="https://www.fca.org.uk/investsmart/5-questions-ask-you-invest"
                            target="blank"
                        >
                            https://www.fca.org.uk/investsmart/5-questions-ask-you-invest
                        </a>
                    </p>
                    <p>
                        If you’re interested in learning more about how to
                        protect yourself, visit the FCA’s website.{" "}
                        <a
                            href="https://www.fca.org.uk/investsmart"
                            target="blank"
                        >
                            https://www.fca.org.uk/investsmart
                        </a>{" "}
                        For additional information about crypto assets, visit
                        the FCA’s website.{" "}
                        <a
                            href="https://www.fca.org.uk/investsmart/crypto-basics "
                            target="blank"
                        >
                            https://www.fca.org.uk/investsmart/crypto-basics{" "}
                        </a>
                    </p>
                    <p>System Of All LLC – SALL & SALL1 tokens</p>
                    {/* ...more in-depth disclaimer content */}
                </ModalContent>
            </ModalBackground>
            <div style={{ position: "relative" }}>
                {/* <Web3Modal config={config} /> */}
                <NavFlex
                    marginTop={!nav && "20px"}
                    boxShadow={
                        nav &&
                        "rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(0, 0, 0, 0.06) 0px 3px 6px 0px"
                    }
                    position={nav && "fixed"}
                    top={nav && "0"}
                    backgroundColor={nav && "#fff"}
                >
                    <div>
                        <a
                            href="https://systemofalltoken.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Image
                                borderRadius="50%"
                                src={logo}
                                width="120px"
                                height="50px"
                                alt="SALL Logo"
                                mobileHeight="100px"
                                mobileWidth="60px"
                            />
                        </a>
                    </div>
                    <Spacer />
                    <NavCenterFlex>
                        <NavAnchorLink
                            href="https://discord.com/channels/994739495385710593/994739496132300801"
                            fontSize="20px"
                            fontWeight="600"
                            color="#000"
                            padding="2px 6px 2px 6px"
                            target="_blank"
                        >
                            Discord
                        </NavAnchorLink>
                        <NavAnchorLink
                            href="https://www.facebook.com/groups/www.systemofalltoken/"
                            fontSize="20px"
                            fontWeight="600"
                            color="#000"
                            padding="2px 6px 2px 6px"
                            target="_blank"
                        >
                            Facebook
                        </NavAnchorLink>
                        <NavAnchorLink
                            href="https://twitter.com/systemofallsall"
                            fontSize="20px"
                            fontWeight="600"
                            color="#000"
                            padding="2px 6px 2px 6px"
                            target="_blank"
                        >
                            Twitter
                        </NavAnchorLink>
                    </NavCenterFlex>
                    <Spacer />
                    <Button
                        color="#2D7BCD"
                        backgroundColor="transparent"
                        borderRadius="30px"
                        padding="12px 25px"
                        border="1px solid #2D7BCD"
                        mobileFontSize="14px"
                        letterSpacing="0.5px"
                        fontWeight="500"
                        onClick={requestAccounts}
                    >
                        {!!account.address
                            ? account.address.substring(
                                  0,
                                  account.address.length - 36
                              ) +
                              "..." +
                              account.address.substring(
                                  account.address.length - 4
                              )
                            : "Connect Metamask"}
                    </Button>
                </NavFlex>
                <CenterFlex marginTop="40px" padding="100px 14px 14px 14px">
                    <DivInCenterFlex margin="2px">
                        <ParaText
                            fontSize="20px"
                            fontWeight="normal"
                            color="#000"
                            padding="2px 6px 2px 6px"
                            textAlign="center"
                        >
                            Golden opportunity to buy System of All (SALL) token
                            at a discounted price.
                            <br />
                            Hurry Up! and buy some tokens before the Sale runs
                            out.
                        </ParaText>
                    </DivInCenterFlex>
                </CenterFlex>
                <BuyContainer>
                    <CenterFlex marginTop="10px" gap="5px" padding="8px">
                        <DivInCenterFlex margin="3px 4px 3px 4px">
                            <Input
                                disabled
                                width="160px"
                                padding="20px"
                                value={`${state.rate || 0} SALL`}
                                mobileWidth="90px"
                            />
                        </DivInCenterFlex>
                        <DivInCenterFlex margin="3px 4px 3px 4px">
                            <FaArrowsAltH
                                icon={faEquals}
                                color="#3266C6"
                                fontSize="18px"
                            />
                        </DivInCenterFlex>
                        <DivInCenterFlex margin="3px 4px 3px 4px">
                            <Input
                                disabled
                                width="160px"
                                padding="20px"
                                value="1 BNB"
                                mobileWidth="90px"
                            />
                        </DivInCenterFlex>
                    </CenterFlex>
                    <CenterFlex width="100%" padding="14px">
                        <Input
                            padding="20px"
                            borderRadius="5px"
                            width="400px"
                            placeholder="Enter BNB amount"
                            value={bnbAmount}
                            type="number"
                            onChange={handleBNBInputChange}
                            mobileWidth="85%"
                            mobilePadding="10px"
                        />
                    </CenterFlex>
                    <CenterFlex marginTop="-10px" padding="14px">
                        <DivInCenterFlex margin="2px">
                            <Button
                                color="#2D7BCD"
                                backgroundColor="transparent"
                                borderRadius="30px"
                                fontStyle="normal"
                                fontWeight="bold"
                                minWidth="110px"
                                padding="10px 25px"
                                border="1px solid #2D7BCD"
                                mobilePadding="10px"
                                mobileFontSize="12px"
                                fontSize="14px"
                                letterSpacing="0.5px"
                                onClick={buy}
                            >
                                {buyLoading ? (
                                    <Spinner border="3px solid #f3f3f3" />
                                ) : (
                                    "Buy"
                                )}
                            </Button>
                        </DivInCenterFlex>
                    </CenterFlex>
                </BuyContainer>
                <CenterFlex marginTop="40px" padding="14px">
                    <DivInCenterFlex margin="2px">
                        <SpanText
                            fontSize="28px"
                            fontWeight="bold"
                            color="#000"
                            padding="2px 6px 2px 6px"
                        >
                            Sale ends in:{" "}
                        </SpanText>
                        <SpanText
                            fontSize="34px"
                            fontWeight="bold"
                            color="#3266C6"
                            padding="1px 4px 1px 4px"
                            mobileFontSize="20px"
                            mobilePadding="0px 2px 0px 2px"
                        >
                            {daysLeft}
                        </SpanText>
                        <SpanText
                            fontSize="15px"
                            mobileFontSize="10px"
                            fontWeight="normal"
                            color="#000"
                        >
                            days
                        </SpanText>
                        <SpanText
                            fontSize="34px"
                            fontWeight="bold"
                            color="#3266C6"
                            padding="1px 4px 1px 4px"
                            mobileFontSize="20px"
                            mobilePadding="0px 2px 0px 2px"
                        >
                            {hoursLeft}
                        </SpanText>
                        <SpanText
                            fontSize="15px"
                            mobileFontSize="10px"
                            fontWeight="normal"
                            color="#000"
                        >
                            hours
                        </SpanText>
                        <SpanText
                            fontSize="34px"
                            fontWeight="bold"
                            color="#3266C6"
                            padding="1px 4px 1px 4px"
                            mobileFontSize="20px"
                            mobilePadding="0px 2px 0px 2px"
                        >
                            {minutesLeft}
                        </SpanText>
                        <SpanText
                            fontSize="15px"
                            mobileFontSize="10px"
                            fontWeight="normal"
                            color="#000"
                        >
                            minutes
                        </SpanText>
                        <SpanText
                            fontSize="34px"
                            fontWeight="bold"
                            color="#3266C6"
                            padding="1px 4px 1px 4px"
                            mobileFontSize="20px"
                            mobilePadding="0px 2px 0px 2px"
                        >
                            {secondsLeft}
                        </SpanText>
                        <SpanText
                            fontSize="15px"
                            mobileFontSize="10px"
                            fontWeight="normal"
                            color="#000"
                        >
                            seconds
                        </SpanText>
                    </DivInCenterFlex>
                </CenterFlex>
                <CenterFlex marginTop="10px" padding="4px">
                    <SpanText
                        fontSize="18px"
                        mobileFontSize="13px"
                        fontWeight="bold"
                        color="#000"
                    >
                        - Benefits of buying SALL Tokens in Pre-Sale.
                    </SpanText>
                </CenterFlex>
                <CenterFlex marginTop="2px">
                    <DivInCenterFlex margin="4px">
                        <Ul padding="4px" margin="8px">
                            <li>
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    color="#3266C6"
                                />
                                <SpanText
                                    fontSize="18px"
                                    mobileFontSize="14px"
                                    padding="5px 0 0 10px"
                                    color="#000"
                                >
                                    The State of the art features of SALL Token
                                    will let your assets value rise even if you
                                    are holding tokens.
                                </SpanText>
                            </li>
                            <br />
                            <li>
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    color="#3266C6"
                                />
                                <SpanText
                                    fontSize="18px"
                                    mobileFontSize="14px"
                                    padding="5px 0 0 10px"
                                    color="#000"
                                >
                                    Get into SALL holders list at a discounted
                                    price before the marketcap grows
                                    exponentially.
                                </SpanText>
                            </li>
                            <br />
                            <li>
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    color="#3266C6"
                                />
                                <SpanText
                                    fontSize="18px"
                                    mobileFontSize="14px"
                                    padding="5px 0 0 10px"
                                    color="#000"
                                >
                                    Get a chance to win 1 NFT from system of all
                                    NFT Marketplace via an AirDrop.
                                </SpanText>
                            </li>
                            <br />
                            <li>
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    color="#3266C6"
                                />
                                <SpanText
                                    fontSize="18px"
                                    mobileFontSize="14px"
                                    padding="5px 0 0 10px"
                                    color="#000"
                                >
                                    Get a chance to win free access to SALL
                                    Multisig Wallet for a whole year.
                                </SpanText>
                            </li>
                        </Ul>
                    </DivInCenterFlex>
                </CenterFlex>
                <Toast isErrorToast={errorToast} isShown={showToast}>
                    {errorToast ? (
                        <SpanText
                            fontSize="14px"
                            fontWeight="normal"
                            color="white"
                            padding="1px 4px 1px 4px"
                        >
                            {toastMessage}
                        </SpanText>
                    ) : (
                        <div>
                            <SpanText
                                fontSize="14px"
                                fontWeight="bold"
                                color="white"
                                padding="1px 4px 1px 4px"
                            >
                                {toastMessage}
                            </SpanText>{" "}
                            <AnchorLink
                                href={`${explorer}${txHash}`}
                                fontSize="14px"
                                fontWeight="bold"
                                color="#000"
                                padding="2px 6px 2px 6px"
                            >
                                View on explorer
                            </AnchorLink>
                        </div>
                    )}
                </Toast>
                {/* <CenterFlex marginTop="30px" padding="3px">
        <Image
          borderRadius="50%"
          src={logo}
          width="60px"
          height="20px"
          alt="SALL Logo"
        />
      </CenterFlex>
      <CenterFlex marginTop="4px" padding="4px">
        <SpanText fontSize="15px" fontWeight="normal" color="#000">
          Copyright @ 2022 SALL
        </SpanText>
      </CenterFlex> */}
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <p className="copyright">
                                2024 © SALL Copyright{" "}
                                <a
                                    href="https://systemofall.com"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                >
                                    <Separator>|</Separator>
                                    systemofall.com
                                </a>
                            </p>
                            <p className="copyright">
                                <a
                                    href="https://sallpresale.com/Terms%20and%20Conditioan%20System%20Of%20All%202024.pdf"
                                    target="_blank"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                    rel="noreferrer"
                                >
                                    Terms & Conditions
                                </a>
                                <Separator>|</Separator>
                                <a
                                    href="https://bscscan.com/address/0x62e4E8e7E1187AE740037701EeAFc890eE37a9c3"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Contract Logic
                                </a>
                                <Separator>|</Separator>
                                <a
                                    href="https://bscscan.com/address/0xBaeF088EbD49cbBe4E3aa00019729cE60f797c37"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Proxy Admin Contract
                                </a>
                                <Separator>|</Separator>
                                <a
                                    href="https://bscscan.com/address/0x9Aab6f0f8240590e6D973A8E84ACD759a99cC08f"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Main Smart Contract
                                </a>
                                <Separator></Separator>
                                <a
                                    href="https://bscscan.com/address/0x5F6d1A66FdAD41E3DAe439a9c0041a380Bbf3f3C"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Stacking Smart Contract
                                </a>
                                <Separator>|</Separator>
                                <a
                                    href="https://bscscan.com/address/0xFe1f042B9f65D68195E38f0Bc16856cF465902B1"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    ICO smart Contract
                                </a>
                                <Separator>|</Separator>
                                <a
                                    href="https://bscscan.com/address/0xA8EB21C39b206A15B9912453f4D6c06521fc5C1c"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Bonding Smart Contract
                                </a>
                                <Separator>|</Separator>
                                <a
                                    href="https://bscscan.com/address/0x85Ac7b0f0cEe8AC281210D78C9FD5798E1C793d1"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Multisig Wallet Factory
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </>
            )}
        </>
    );
};

export default Home;
