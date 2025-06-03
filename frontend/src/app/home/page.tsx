"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import { ethers, Contract, BrowserProvider, JsonRpcProvider } from "ethers";
import abi from "@/services/ABI.abi.json";
import Image from "next/image";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export default function HomePage() {
  const [wallet, setWallet] = useState("");
  const [contract, setContract] = useState<Contract | null>(null);
  const [mintStatus, setMintStatus] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        let savedWallet: string | null = null;

        // Só tenta acessar localStorage se estiver no browser
        if (typeof window !== "undefined") {
          savedWallet = localStorage.getItem("wallet");
        }

        setWallet(savedWallet || "");

        let provider;
        let signer = null;

        if (typeof window !== "undefined" && (window as any).ethereum) {
          provider = new BrowserProvider((window as any).ethereum);

          if (savedWallet) {
            await provider.send("eth_requestAccounts", []); // Garante conexão
            signer = await provider.getSigner();
          }
        } else {
          provider = new JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
        }

        const instance = new Contract(CONTRACT_ADDRESS, abi, signer || provider);
        setContract(instance);
      } catch (err) {
        console.error("Erro ao carregar contrato:", err);
      }
    };

    load();
  }, []);

  const handleMint = async () => {
    if (!contract) {
      setMintStatus("⚠️ Contrato não carregado.");
      return;
    }

    try {
      setMintStatus("Mintando 1 token...");
      const tx = await contract.publicMint();
      await tx.wait();
      setMintStatus("✅ Mint de 1 token realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao mintar:", error);
      setMintStatus("❌ Falha ao mintar token.");
    }
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="card p-5 shadow-sm" style={{ maxWidth: "450px", width: "100%" }}>
          <div className="mb-3 d-flex align-items-center gap-2">
            <Image src="/icons/transfer.svg" alt="Mint Icon" width={24} height={24} />
            <h4 className="mb-0">Mintar 1 Token</h4>
          </div>

          <p className="text-muted">
            Essa ação irá mintar exatamente 1 token para sua carteira conectada.
          </p>

          <button
            className="btn btn-light d-flex align-items-center justify-content-center gap-2"
            onClick={handleMint}
          >
            <Image src="/icons/transfer2.svg" alt="Mint" width={20} height={20} />
            Mintar 1 Token
          </button>

          {mintStatus && <p className="mt-3">{mintStatus}</p>}
        </div>
      </div>
    </DashboardLayout>
  );
}
