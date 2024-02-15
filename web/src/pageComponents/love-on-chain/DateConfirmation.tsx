import { useState } from 'react';
import Image from 'next/image';
import { CURR_USER } from '../../mocks/userMocks';
import {Invite} from '../../types'
import CommitToDateFormStep from './steps/LoveOnChainFormStep/CommitToDateStep';

type DateConfirmationProps = {
    dateInvite: Invite;
}

export enum TransactionSteps {
    START_TRANSACTION_STEP,
    TRANSACTION_COMPLETE_STEP,
    OUT_OF_GAS_STEP,
  }

export default function DateConfirmation({dateInvite}: DateConfirmationProps) {
    const [transactionStep, setTransactionStep] = useState<TransactionSteps | null>(null);
    return (
        <div className='flex flex-col justify-center gap-2'>
            <div className='flex flex-row gap-2'>
            <Image alt="Match Avatar" src={dateInvite.inviter.avatar} className="h-12 w-12 round bg-pink-100" />
            <h3 className='font-bold'>{dateInvite.inviter.userName} asked you on a date!</h3>
            </div>
            
            <div className="ml-2 m-1">
                <p>Date: {dateInvite.date}</p>
                <p>Time: {dateInvite.time}</p>
                <p>Time: {dateInvite.location}</p>
            </div>
            <CommitToDateFormStep
            dateId={dateInvite.inviter.userName + "-" + CURR_USER.userName}
            stake={0.00001}
            transactionStep={transactionStep}
            setTransactionStep={setTransactionStep}
            />

        </div>
    );

}