import Image from 'next/image';
import { CURR_USER } from '../../mocks/userMocks';

export default function Profile() {
  // TODO: Fetch these values dynamically
  const coffeeReceivedCount = 90;

  return (
    <section className="font-inter flex flex-col justify-start gap-8 md:flex-row md:items-center">
      {/* Fetch user avatar dynamically */}
      <Image alt="User Avatar" src={CURR_USER.avatar} className="h-28 w-28" />
      <div className="flex flex-col items-start justify-start gap-2">
        <h1 className="w-96 text-3xl font-semibold text-white">{CURR_USER.userName}</h1>
        <p className="text-base font-normal leading-normal text-zinc-400">{CURR_USER.bio}</p>
        <p className="flex items-center justify-start gap-2">
          <Image
            alt="Coffees Received"
            src="/coffee.svg"
            className="h-4 w-4"
            width={0}
            height={0}
          />
          <span className="text-base font-normal leading-normal text-white">
            {coffeeReceivedCount} cups of coffee received
          </span>
        </p>
      </div>
    </section>
  );
}
