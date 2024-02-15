import Image from 'next/image';
import {Invite} from '../../types';

type InviteProps = {
    invite: Invite;
    selected?: boolean;
    clickHandler: (invite: Invite) => void;
}

export default function MatchProfile({invite, selected, clickHandler}: InviteProps) {
  

  return (
    <button type="button" onClick={() => clickHandler(invite)} className={`box font-inter flex flex-row  gap-6 p-2 md:flex-row bg-white rounded-xl ` + (selected ? 'border-red-500': 'border-pink-100')}>
      {/* Fetch user avatar dynamically */}
        <Image alt="Match Avatar" src={invite.inviter.avatar} className="h-12 w-12 round bg-pink-100" />
      <div className="box flex flex-col items-start justify-start ">
        <span className="font-semibold text-black">{invite.inviter.userName}</span>
        <span className="text-base font-normal leading-normal text-zinc-400">{invite.inviter.bio}</span>
      </div>
    </button>
  );
}