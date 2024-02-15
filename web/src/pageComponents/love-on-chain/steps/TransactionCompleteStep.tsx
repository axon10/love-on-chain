type TransactionCompleteStepProps = {
  stake: number;
};

export default function TransactionCompleteStep({
  stake,
}: TransactionCompleteStepProps) {

  return (
    <>
      <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white">
        You staked {stake} ω!
      </h2>

      <div className="text-center text-6xl">🎁</div>

      <div className="my-4 text-center text-sm text-gray-400">
        Better not ghost your date!
      </div>
    </>
  );
}
