'use client';

import { useEffect, useState } from 'react';
import Header from '../../src/components/header/Header';
import HorizontalLine from '../../src/components/horizontal-line/HorizontalLine';
import LoveOnChainContractDemo from '../../src/pageComponents/love-on-chain/ContractDemo';


/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function LoveOnChainPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //  Fix hydration issues
  if (!isMounted) return null;

  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-8 py-6">
        <LoveOnChainContractDemo/>
      </main>
    </>
  );
}
