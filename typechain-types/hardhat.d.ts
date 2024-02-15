/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "DateVerificationEscrow",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DateVerificationEscrow__factory>;
    getContractFactory(
      name: "Staker",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Staker__factory>;

    getContractAt(
      name: "DateVerificationEscrow",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.DateVerificationEscrow>;
    getContractAt(
      name: "Staker",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Staker>;

    deployContract(
      name: "DateVerificationEscrow",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.DateVerificationEscrow>;
    deployContract(
      name: "Staker",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Staker>;

    deployContract(
      name: "DateVerificationEscrow",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.DateVerificationEscrow>;
    deployContract(
      name: "Staker",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Staker>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
