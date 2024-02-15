import { TransactionSteps } from '../../ContractDemo';
import FormCommitToDate from './FormCommitToDate';

type CommitToDateStepProps = {
  setTransactionStep: React.Dispatch<React.SetStateAction<TransactionSteps | null>>;
  stake: number;
  dateId: string;
  transactionStep: TransactionSteps | null;
};

export default function CommitToDateFormStep({
  setTransactionStep,
  stake,
  dateId,
  transactionStep,
}: CommitToDateStepProps) {
  return (
    <FormCommitToDate
      setTransactionStep={setTransactionStep}
      stake={stake}
      dateId={dateId}
      transactionStep={transactionStep}
    />
  );
}
