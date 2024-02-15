import type { Address } from 'viem';

export type CoffeeMemo = {
  numCoffees: bigint;
  userName: string;
  message: string;
  userAddress: Address;
  time: bigint;
  twitterHandle?: string;
};

export type User = {
  avatar: string;
  userName: string;
  bio: string;
}

export type Invite = {
  inviter: User;
  date: string;
  time: string;
  location: string;
}