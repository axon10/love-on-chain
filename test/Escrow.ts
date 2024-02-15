<<<<<<< HEAD
import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DateVerificationEscrow", function () {
=======
const { expect } = require("chai");
const { ethers } = require("hardhat");
import { parseEther, parseUnits} from "ethers";
import { setBalance } from "@nomicfoundation/hardhat-network-helpers";

describe("smart contract", function () {
  it("Happy path", async function () {
    const DateVerificationEscrow = await ethers.getContractFactory(
      "DateVerificationEscrow"
    );
    var escrow = await DateVerificationEscrow.deploy();

    const deployedAddress = await escrow.getAddress();
    const all_signers = await ethers.getSigners();
    const owner = all_signers[0];
    const anika = all_signers[1];
    const ana = all_signers[2];
    const gautham = all_signers[3];

    setBalance(deployedAddress, 10**40);
    for (var signer of all_signers) {
      setBalance(signer.address, 10**20);
    }


    await escrow.initDate("anika-ana", anika.address, ana.address);

    const anika_stake = await escrow.connect(anika).stake("anika-ana", {value: parseUnits("100", "wei")});
    await expect(anika_stake).to.emit(escrow, "StakeMade");
    await expect(anika_stake).to.changeEtherBalance(anika, -100);

    const ana_stake = await escrow.connect(ana).stake("anika-ana", {value: parseUnits("100", "wei")});
    await expect(ana_stake).to.emit(escrow, "StakeMade");
    await expect(ana_stake).to.changeEtherBalance(ana, -100);

    await escrow.confirmAttendanceInt("anika-ana", anika.address);
    await expect(
      escrow.confirmAttendanceInt("anika-ana", ana.address)
    ).to.emit(escrow, "AttendanceConfirmed");
  });
>>>>>>> 7dda88ac (add hardhat test)
});
