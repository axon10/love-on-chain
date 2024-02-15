import { useWriteContract } from 'wagmi';
import { markStep } from '../utils/analytics';
import { useLoveOnChainContract } from './contracts';

function useLoveOnChain() {
    const contract = useLoveOnChainContract();
    const {writeContract} = useWriteContract();
  
    markStep('useReadContract.initDate');
    const initDate = writeContract({
      address: '0x78Ef597C52805CD940F8b90C75e94982635C4e6E',
      abi: contract.abi,
      functionName: 'initDate',
      args: [
          'anika-ana',
          '0x4046aF2e421651CFd6080B85A96d200be91C676B',
          '0x5271F6dfE8080c1dc6E110E83D8687b54fAf1f9c'
      ]
    });
    markStep('useReadContract.initDate');
    

    return initDate;
  }
  
  export default useLoveOnChain;
  