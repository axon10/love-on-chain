import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Staker", (m) => {
  const token = m.contract("Staker");

  return { token };
});
