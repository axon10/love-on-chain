import { useReadContract } from 'wagmi';
import { CoffeeMemo } from '../types';
import { markStep } from '../utils/analytics';
import { useLoveOnChainContract } from './contracts';

function useLoveOnChain() {
    const contract = useLoveOnChainContract();
  
    markStep('useReadContract.refetchMemos');
    const contractReadResult = useReadContract({
      address: contract.status === 'ready' ? contract.address : undefined,
      abi: contract.abi,
      functionName: 'getMemos',
    });
    markStep('useReadContract.refetchMemos');
  
    return {
      memos: contractReadResult.status === 'success' ? (contractReadResult.data as CoffeeMemo[]) : [],
      refetchMemos: contractReadResult.refetch,
    };
  }
  
  export default useLoveOnChain;
  