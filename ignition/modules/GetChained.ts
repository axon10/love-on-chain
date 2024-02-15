import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DateVerificationEscrow", (m) => {
  const token = m.contract("DateVerificationEscrow");

  m.call(token, "launch", [m.getParameter("address")]);

  return { token };
});
