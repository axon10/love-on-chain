import Image from 'next/image';


type MatchProfileProps = {
    avatar: string;
    userName: string;
    bio: string;
    selected?: boolean;
    clickHandler: (match: string) => void;
}

export default function MatchProfile({avatar, userName, bio, selected, clickHandler}: MatchProfileProps) {
  

  return (
    <button type="button" onClick={() => clickHandler(userName)} className={`box font-inter flex flex-row  gap-6 p-2 md:flex-row bg-white rounded-xl border-solid` + (selected ? 'border-pink-100': 'border-pink-100')}>
      {/* Fetch user avatar dynamically */}
        <Image alt="Match Avatar" src={avatar} className="h-12 w-12 round border-solid border-black bg-pink-100" />
      <div className="box flex flex-col justify-start ">
        <p className="font-semibold text-black">{userName}</p>
        <p className="text-base font-normal leading-normal text-zinc-400">{bio}</p>
      </div>
    </button>
  );
}