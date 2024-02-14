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
    <button type="button" onClick={() => clickHandler(userName)} className={`box font-inter flex flex-row  gap-6 p-2 md:flex-row bg-white rounded-xl ` + (selected ? 'border-red-500': 'border-pink-100')}>
      {/* Fetch user avatar dynamically */}
        <Image alt="Match Avatar" src={avatar} className="h-12 w-12 round bg-pink-100" />
      <div className="box flex flex-col items-start justify-start ">
        <span className="font-semibold text-black">{userName}</span>
        <span className="text-base font-normal leading-normal text-zinc-400">{bio}</span>
      </div>
    </button>
  );
}