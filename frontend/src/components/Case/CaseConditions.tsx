import { ChangeEvent, useState } from "react";

type CaseConditionsProps = {
  conditions: Condition[];
  onSetCondition: (code: string) => void;
};

export type Condition = {
  code: string;
  description: string;
};

export default function CaseConditions({
  conditions,
  onSetCondition,
}: CaseConditionsProps) {
  const [selectedCode, setSelectedCode] = useState<string | undefined>(
    undefined
  );

  return (
    <form onSubmit={(ev) => ev.preventDefault()}>
      <select
        size={conditions.length}
        value={selectedCode}
        onChange={(ev) => setSelectedCode(ev.target.value)}
      >
        {conditions.map((condition) => (
          <option
            key={condition.code}
            label={`${condition.description} (${condition.code})`}
            value={condition.code}
          ></option>
        ))}
      </select>
      <button
        onClick={() => selectedCode && onSetCondition(selectedCode)}
        disabled={!selectedCode}
      >
        Submit and get next
      </button>
    </form>
  );
}
