const { expect } = require("chai");
const { ethers } = require("hardhat");
import { parseEther, parseUnits } from "ethers";
import { loadFixture, setBalance } from "@nomicfoundation/hardhat-network-helpers";

describe("smart contract", function () {
  async function deploy() {
    const DateVerificationEscrow = await ethers.getContractFactory(
      "DateVerificationEscrow"
    );
    const Staker = await ethers.getContractFactory("Staker");
    var staker = await Staker.deploy();
    const stakerAddress = await staker.getAddress();
    var escrow = await DateVerificationEscrow.deploy(stakerAddress);

    const deployedAddress = await escrow.getAddress();
    const all_signers = await ethers.getSigners();
    const owner = all_signers[0];
    const anika = all_signers[1];
    const ana = all_signers[2];
    const gautham = all_signers[3];

    setBalance(deployedAddress, 10 ** 40);
    setBalance(stakerAddress, 20 ** 40);
    for (var signer of all_signers) {
      setBalance(signer.address, 10 ** 20);
    }
    return {owner, anika, ana, gautham, escrow};
  }
  it("Happy path", async function () {
    const {owner, anika, ana, gautham, escrow} = await loadFixture(deploy);
    await escrow.initDate("anika-ana", anika.address, ana.address);

    const anika_stake = await escrow
      .connect(anika)
      .stake("anika-ana", { value: parseUnits("100", "wei") });
    await expect(anika_stake).to.emit(escrow, "StakeMade");
    await expect(anika_stake).to.changeEtherBalance(anika, -100);

    const ana_stake = await escrow
      .connect(ana)
      .stake("anika-ana", { value: parseUnits("100", "wei") });
    await expect(ana_stake).to.emit(escrow, "StakeMade");
    await expect(ana_stake).to.changeEtherBalance(ana, -100);

    await escrow.confirmAttendanceInt("anika-ana", anika.address);
    const finish_attendance = escrow.confirmAttendanceInt(
      "anika-ana",
      ana.address
    );
    await expect(finish_attendance).to.emit(escrow, "AttendanceConfirmed");
    await expect(finish_attendance).to.changeEtherBalance(escrow, 600);
    await expect(finish_attendance).to.changeEtherBalance(anika, 100);
    await expect(finish_attendance).to.changeEtherBalance(ana, 100);
  });

  it("Try to stake from different address", async function () {
    const {owner, anika, ana, gautham, escrow} = await loadFixture(deploy);
    await escrow.initDate("anika-ana", anika.address, ana.address);

    const anika_stake = await escrow
      .connect(anika)
      .stake("anika-ana", { value: parseUnits("100", "wei") });
    await expect(anika_stake).to.emit(escrow, "StakeMade");
    await expect(anika_stake).to.changeEtherBalance(anika, -100);

    const ana_stake = escrow
      .connect(gautham)
      .stake("anika-ana", { value: parseUnits("100", "wei") });
    await expect(ana_stake).to.be.revertedWith("Not a participant");
  });

  it("Try to confirm without staking", async function () {
    const {owner, anika, ana, gautham, escrow} = await loadFixture(deploy);
    await escrow.initDate("anika-ana", anika.address, ana.address);

    const anika_stake = await escrow
      .connect(anika)
      .stake("anika-ana", { value: parseUnits("100", "wei") });
    await expect(anika_stake).to.emit(escrow, "StakeMade");
    await expect(anika_stake).to.changeEtherBalance(anika, -100);

    await escrow.confirmAttendanceInt("anika-ana", anika.address);
    const finish_attendance = escrow.confirmAttendanceInt(
      "anika-ana",
      ana.address
    );
    await expect(finish_attendance).to.be.revertedWith("Stake not already made");
  });
});
