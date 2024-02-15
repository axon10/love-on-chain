import Image from 'next/image';
import { CURR_USER } from '../../mocks/userMocks';

export default function Profile() {

  return (
    <section className="font-inter mb-3 flex flex-row justify-start gap-8 md:flex-row md:items-center">
      {/* Fetch user avatar dynamically */}
      <Image alt="User Avatar" src={CURR_USER.avatar} className="h-28 w-28" />
      <div className="flex flex-col items-start justify-start gap-2">
        <h1 className="w-96 text-3xl font-semibold text-black">{CURR_USER.userName}</h1>
        <p className="text-base font-normal leading-normal text-zinc-400">{CURR_USER.bio}</p>
      </div>
    </section>
  );
}
