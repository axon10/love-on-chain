import { Abi, Address, type Chain } from 'viem';
import { baseSepolia } from 'viem/chains';
import { useAccount } from 'wagmi';
import LoveOnChainABI from '../contract/LoveOnChain';

type ContractInstance = {
  chain: Chain;
  address: Address;
  deactivated?: boolean;
};

type UseContractReturn<T extends Abi> = { abi: T; supportedChains: Chain[] } & (
  | { address: Address; status: 'ready' }
  | { status: 'onUnsupportedNetwork' }
  | { status: 'notConnected' }
  | { status: 'deactivated' }
);

type Spec<T extends Abi> = {
  abi: T;
  [chainId: number]: ContractInstance;
};

/**
 * Generates a hook that returns contract data based on the current network.
 */
export function generateContractHook<T extends Abi>({ abi, ...spec }: Spec<T>) {
  function useContract(): UseContractReturn<typeof abi> {
    const { chain, isConnected } = useAccount();
    const supportedChains = Object.values(spec).map((s) => s.chain);

    if (!isConnected) {
      return { abi, status: 'notConnected', supportedChains };
    }

    if (chain && chain.id in spec) {
      if (spec[chain.id].deactivated) {
        return { abi, status: 'deactivated', supportedChains };
      }

      return {
        abi,
        address: spec[chain.id].address,
        status: 'ready',
        supportedChains,
      };
    }

    return {
      abi,
      status: 'onUnsupportedNetwork',
      supportedChains,
    };
  }

  return useContract;
}

export const useLoveOnChainContract = generateContractHook({
  abi: LoveOnChainABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x78Ef597C52805CD940F8b90C75e94982635C4e6E',
  },
});
