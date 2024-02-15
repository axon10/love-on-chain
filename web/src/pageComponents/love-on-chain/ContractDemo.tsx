import { useCallback, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { INVITES } from '../../mocks/userMocks';
import { Invite } from '../../types';
import MatchProfile from '../love-on-chain/MatchProfile';
import Profile from '../love-on-chain/Profile';
import DateConfirmation from './DateConfirmation';

export enum TransactionSteps {
  START_TRANSACTION_STEP,
  TRANSACTION_COMPLETE_STEP,
  OUT_OF_GAS_STEP,
}

export default function LoveOnChainContractDemo() {
  const [selectedInvite, setSelectedInvite] = useState<Invite>();
  
  const onSelectMatch = useCallback((invite: Invite) => {
    setSelectedInvite(invite);
    
  }, [setSelectedInvite])

  useEffect(() =>{
   console.log(selectedInvite);
  });

  const matches = useMemo(() => {
    return (
      <div className='flex flex-col gap-1'>
        {INVITES.map((invite) => (
            <MatchProfile key={invite.inviter.userName} invite={invite} selected={selectedInvite === invite} clickHandler={onSelectMatch}/>
        )) 
        }
      </div>
    );
  }, [selectedInvite, onSelectMatch]);
  
  return (
    <div>
      <Profile/>
      <div className='flex flex-row gap-10'>
        <aside className='bg-white p-3 rounded-xl'>
        {selectedInvite ? <DateConfirmation dateInvite={selectedInvite}/> : <section>
          <h3 className="text-xl font-bold">My invites</h3>
            {matches}
        </section>}
        </aside>
      </div>
    </div>
  );
}
