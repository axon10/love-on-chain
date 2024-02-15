import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import {  TransactionExecutionError, parseEther } from 'viem';
import { useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import Button from '../../../../components/Button/Button';
import { useLoveOnChainContract } from '../../../../hooks/contracts';
import { useLoggedInUserCanAfford } from '../../../../hooks/useUserCanAfford';
import { TransactionSteps } from '../../ContractDemo';
import OutOfGasStep from '../OutOfGasStep';
import StartTransactionStep from '../StartTransactionStep';
import TransactionCompleteStep from '../TransactionCompleteStep';
//import { useWaitForTransactionReceipt  } from 'wagmi';

type FormCommitToDateProps = {
  setTransactionStep: React.Dispatch<React.SetStateAction<TransactionSteps | null>>;
  stake: number;
  dateId: string;
  transactionStep: TransactionSteps | null;
};

const MIN_STAKE = 0.00001;

function FormCommitToDate({
  setTransactionStep,
  stake,
  dateId,
  transactionStep,
}: FormCommitToDateProps) {
  // Component state
  const [dataHash, setDataHash] = useState<string | undefined>();

  // Get the correct contract info for current network (if present)
  const contract = useLoveOnChainContract();

  // Calculate if the user can afford to buy coffee
  const canAfford = useLoggedInUserCanAfford(parseEther(String(MIN_STAKE)));

  const handleOncomplete = useCallback(async () => {
    // TODO: handle form submission
    console.log('Date confirmed!')
  }, []);

  // Wagmi Write call
  const { data: loveOnChainData } = useSimulateContract({
    address: '0x78Ef597C52805CD940F8b90C75e94982635C4e6E',
    abi: contract.abi,
    functionName: 'stake',
    args: [dateId],
    query: {
      enabled: contract.status === 'ready',
    },
    value: parseEther(String(MIN_STAKE)),
  });

  const {
    writeContract: loveOnChain,
    data: dataLoveOnChain,
    error: errorLoveOnChain,
  } = useWriteContract();

  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash: dataLoveOnChain,
    query: {
      enabled: !!dataLoveOnChain,
    },
  });

  useEffect(() => {
    async function handleTransactionStatus() {
      if (transactionStatus === 'error' && dataHash !== '') {
        await handleOncomplete();
        if (
          errorLoveOnChain instanceof TransactionExecutionError &&
          errorLoveOnChain.message.toLowerCase().includes('out of gas')
        ) {
          setTransactionStep(TransactionSteps.OUT_OF_GAS_STEP);
        } else {
          setTransactionStep(null);
        }
      } else if (transactionStatus === 'success' && dataHash !== '') {
        await handleOncomplete();
        setDataHash('');
        setTransactionStep(TransactionSteps.TRANSACTION_COMPLETE_STEP);
      }
    }
    void handleTransactionStatus();
  }, [
    dataHash,
    errorLoveOnChain,
    handleOncomplete,
    setTransactionStep,
    transactionStatus,
  ]);

  const {writeContract} = useWriteContract(); 

  const handleSubmit = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
        console.log('Commiting');
        writeContract({
          address: '0x5271F6dfE8080c1dc6E110E83D8687b54fAf1f9c',
          abi: contract.abi,
          functionName: 'initDate',
          args: [
              'anika-ana',
              '0x4046aF2e421651CFd6080B85A96d200be91C676B',
              '0xBa6618c6E109cA31F7E22e80557117f9813D5b49'
          ]
        });

        writeContract({
          address: '0x5271F6dfE8080c1dc6E110E83D8687b54fAf1f9c',
          abi: contract.abi,
          functionName: 'stake',
          args: [
              'anika-ana',
          ]
        });

        writeContract({
          address: '0x5271F6dfE8080c1dc6E110E83D8687b54fAf1f9c',
          abi: contract.abi,
          functionName: 'stakeInt',
          args: [
              'anika-ana',
              '0xBa6618c6E109cA31F7E22e80557117f9813D5b49',
              BigInt(100),
          ]
        });
        //loveOnChain?.(loveOnChainData?.request);
        //setTransactionStep(TransactionSteps.TRANSACTION_COMPLETE_STEP);
        //setDataHash(dataLoveOnChain);

        //const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        //  dataHash,
        //})
    },
    [writeContract, loveOnChainData?.request, loveOnChain, dataLoveOnChain, setTransactionStep, contract.abi],
  );

  const submitButtonContent = useMemo(() => {
    return (
      <>
        Stake {stake} ETH to commit to the date!
      </>
    );
  }, [stake]);

  const warningContent = useMemo(() => {
    if (contract.status === 'notConnected') {
      return <>Please connect your wallet to continue.</>;
    }

    if (!canAfford) {
      return (
        <>You must have at least {String(MIN_STAKE)} ETH in your wallet to continue.</>
      );
    }

    if (contract.status === 'onUnsupportedNetwork') {
      return (
        <>
          Please connect to one of the supported networks to continue:{' '}
          {contract.supportedChains.map((c) => c.name).join(', ')}
        </>
      );
    }

    if (contract.status === 'deactivated') {
      return <>This contract has been deactivated on this chain.</>;
    }

    return null;
  }, [canAfford, contract.status, contract.supportedChains]);

  return (
    <>
      {transactionStep === TransactionSteps.START_TRANSACTION_STEP && <StartTransactionStep />}

      {transactionStep === TransactionSteps.TRANSACTION_COMPLETE_STEP && (
        <TransactionCompleteStep stake={MIN_STAKE}/>
      )}

      {transactionStep === TransactionSteps.OUT_OF_GAS_STEP && (
        <OutOfGasStep min_stake={MIN_STAKE} setTransactionStep={setTransactionStep} />
      )}

      {transactionStep === null && (
        <>
          <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left">
            Say no to ghosting!
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
              {warningContent ? (
                <div className="my-3 flex items-center justify-center">
                  <div className="mr-2">
                    <ExclamationTriangleIcon width={12} height={12} />
                  </div>
                  <div className="text-xs">{warningContent}</div>
                </div>
              ) : null}

              <Button buttonContent={submitButtonContent} type="submit" onClick={handleSubmit} />
          </form>
        </>
      )}
    </>
  );
}

export default FormCommitToDate;
