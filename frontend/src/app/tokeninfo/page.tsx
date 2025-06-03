"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import { ethers, Contract, BrowserProvider, JsonRpcProvider } from "ethers";
import abi from "@/services/ABI.abi.json";
//import contractJson from "@/services/ABI.abi.json";
import abiJson from "@/services/ABI.abi.json";
import type { InterfaceAbi } from "ethers";
import Image from "next/image";

//const abi = contractJson.abi;
//const abi = abiJson as InterfaceAbi;

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
console.log("CONTRACT_ADDRESS dentro do React:", CONTRACT_ADDRESS);
//export const PROXY_LINK = "https://testnet.bscscan.com/address/0x1ac7e8435C3b34c7dC6D8e36A86B03F90f22D06B";
//export const IMPLEMENTATION_LINK = "https://testnet.bscscan.com/address/0x4E3c..."; // Substitua com o real


export default function TokenInfoPage() {
    const [wallet, setWallet] = useState("");
    const [contract, setContract] = useState<Contract | null>(null);
    const [tokenInfo, setTokenInfo] = useState({
        name: "",
        symbol: "",
        totalSupply: "",
        balance: "-",
        maxSupply: "",
        ownerPercent: "",
        userPercent: "",
        remainingPercent: "",
    });

    useEffect(() => {
        const load = async () => {
            const savedWallet = localStorage.getItem("wallet");
            setWallet(savedWallet || "");

            /*let provider;
            let signer = null;

            if (window.ethereum && savedWallet) {
                provider = new BrowserProvider(window.ethereum);
                signer = await provider.getSigner();
            } else {
                provider = new JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
            }*/

            const provider = new JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
            // Desativa temporariamente uso do signer
            const signer = null;

            console.log("É array?", Array.isArray(abi)); // deve retornar true
            console.log("Address:", CONTRACT_ADDRESS);   // deve bater com o contrato na testnet

            //const instance = new Contract(CONTRACT_ADDRESS, abi, signer || provider);

            const implementationABI = abi as InterfaceAbi;
            const instance = new ethers.Contract(CONTRACT_ADDRESS, implementationABI, signer || provider);

            console.log("Contrato carregado:", instance);
            setContract(instance);
        };

        load();
    }, []);

    useEffect(() => {
        const fetchTokenData = async () => {
            if (!contract) return;

            try {
                const [name, symbol, total, owner, maxSupplyRaw] = await Promise.all([
                    contract.name(),
                    contract.symbol(),
                    contract.totalSupply(),
                    contract.owner(),
                    contract.MAX_SUPPLY(),
                ]);

                const ownerBalance = await contract.balanceOf(owner);

                const totalFormatted = parseFloat(ethers.formatUnits(total, 18));
                const maxSupplyFormatted = parseFloat(ethers.formatUnits(maxSupplyRaw, 18));

                // Só busca saldo se wallet estiver conectada
                let balanceFormatted = "-";
                if (wallet) {
                    const balance = await contract.balanceOf(wallet);
                    balanceFormatted = ethers.formatUnits(balance, 18);
                }

                const userMinted = totalFormatted - 50;
                const userPercent = ((userMinted / maxSupplyFormatted) * 100).toFixed(2);
                const remainingPercent = (((maxSupplyFormatted - totalFormatted) / maxSupplyFormatted) * 100).toFixed(2);

                setTokenInfo({
                    name,
                    symbol,
                    totalSupply: totalFormatted.toString(),
                    balance: balanceFormatted,
                    maxSupply: maxSupplyFormatted.toString(),
                    ownerPercent: "50.00",
                    userPercent,
                    remainingPercent,
                });
            } catch (err) {
                console.error("Erro ao buscar dados do token:", err);
            }
        };

        fetchTokenData();
    }, [contract, wallet]);

    return (
        <DashboardLayout>
            <div style={{ padding: "2rem" }}>
                <div className="d-flex justify-content-between align-items-center mb-4" style={{ maxWidth: "800px" }}>
                    <div className="d-flex align-items-center gap-2">
                        <Image src="/icons/transfer.svg" alt="Mint Icon" width={24} height={24} />
                        <h2 className="mb-0">Token Info</h2>
                    </div>


                </div>

                <div className="d-flex justify-content-start align-items-start gap-4 flex-wrap mt-4">
                    {/* Card Token Info */}
                    <ul className="list-group" style={{ maxWidth: "400px", width: "100%" }}>
                        <li className="list-group-item"><strong>Nome:</strong> {tokenInfo.name}</li>
                        <li className="list-group-item"><strong>Símbolo:</strong> {tokenInfo.symbol}</li>
                        <li className="list-group-item"><strong>Total Supply:</strong> {tokenInfo.totalSupply}</li>
                        <li className="list-group-item"><strong>Max Supply:</strong> {tokenInfo.maxSupply}</li>
                        <li className="list-group-item"><strong>Seu saldo:</strong> {tokenInfo.balance}</li>
                        <li className="list-group-item">
                            <strong>Distribuição:</strong>
                            <ul className="mt-2 mb-0">
                                <li><span style={{ color: "green" }}>⬤</span> Owner (fixo): {tokenInfo.ownerPercent}%</li>
                                <li><span style={{ color: "orange" }}>⬤</span> Usuários: {tokenInfo.userPercent}%</li>
                                <li><span style={{ color: "gray" }}>⬤</span> Disponível para mint: {tokenInfo.remainingPercent}%</li>
                            </ul>
                        </li>
                    </ul>

                    {/* Botões ao lado direito */}
                    <div className="d-flex flex-column gap-2 pt-2">
                        <a
                            href="https://testnet.bscscan.com/address/0x29f20d129e259083c46172de0a71ba2935c95ea6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                        >
                            <Image src="/icons/blockchain.svg" alt="Proxy" width={16} height={16} />
                            Ver Proxy
                        </a>

                        <a
                            href="https://testnet.bscscan.com/address/0x1ac7e8435C3b34c7dC6D8e36A86B03F90f22D06B"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
                        >
                            <Image src="/icons/blockchain.svg" alt="Implementation" width={16} height={16} />
                            Ver Implementation
                        </a>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
