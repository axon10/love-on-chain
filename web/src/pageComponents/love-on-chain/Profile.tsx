import Image from 'next/image';
import UserAvatar from './Avatar.svg';

export default function Profile() {
  // TODO: Fetch these values dynamically
  const userName = 'Pengu';
  const bio = 'I am looking for my valentine!';

  return (
    <section className="font-inter mb-3 flex flex-col justify-start gap-8 md:flex-row md:items-center">
      {/* Fetch user avatar dynamically */}
      <Image alt="User Avatar" src={UserAvatar} className="h-28 w-28" />
      <div className="flex flex-col items-start justify-start gap-2">
        <h1 className="w-96 text-3xl font-semibold text-white">{userName}</h1>
        <p className="text-base font-normal leading-normal text-zinc-400">{bio}</p>
      </div>
    </section>
  );
}
