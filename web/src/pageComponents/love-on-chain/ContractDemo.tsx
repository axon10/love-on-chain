import { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { MATCHES } from '../../mocks/userMocks';
import MatchProfile from '../love-on-chain/MatchProfile';
import Profile from '../love-on-chain/Profile';

export enum TransactionSteps {
  START_TRANSACTION_STEP,
  TRANSACTION_COMPLETE_STEP,
  OUT_OF_GAS_STEP,
}

export default function LoveOnChainContractDemo() {

  const [selectedMatch, setSelectedMatch] = useState('Mr. Right');
  
  const onSelectMatch = useCallback((matchName: string) => {
    setSelectedMatch(matchName);
  }, [setSelectedMatch])

  const dateDetails = useMemo(() => {
    return (
      <div className='flex flex-col gap-1'>
        {MATCHES.map((user) => (
            <MatchProfile key={user.userName} userName={user.userName} bio={user.bio} avatar={user.avatar} selected={selectedMatch === user.userName} clickHandler={onSelectMatch}/>
        )) 
        }
      </div>
    );
  }, [selectedMatch, onSelectMatch]);

  return (
    <div>
      <Profile/>
      <section>
        <h3 className="text-xl font-bold">My matches</h3>
          {dateDetails}
      </section>
    </div>
  );
}
