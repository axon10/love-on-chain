import Image from 'next/image';
import {Invite} from '../../types'
type DateConfirmationProps = {
    dateInvite: Invite;
    confirmationHandler: () => void;
}

export default function DateConfirmation({dateInvite, confirmationHandler}: DateConfirmationProps) {

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
            <button type="button" onClick={confirmationHandler} className='bg-pink-100 max-w-max p-2 m-auto mt-2 rounded-xl'>Accept date</button>
        </div>
    );

}