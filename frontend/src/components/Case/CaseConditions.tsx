import { useState } from "react";
import "./CaseConditions.css";

type CaseConditionsProps = {
  currentCase: Case;
  conditions: Condition[];
  onSetCondition: (caseId: string, code: string) => void;
};

export type Case = {
  _id: string;
  description: string;
};

export type Condition = {
  code: string;
  description: string;
};

export default function CaseConditions({
  currentCase,
  conditions,
  onSetCondition,
}: CaseConditionsProps) {
  const [selectedCode, setSelectedCode] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 justify-items-center p-10">
        <h2 className="text-left text-xl font-semibold">Select Condition:</h2>
        <form onSubmit={(ev) => ev.preventDefault()} className="space-y-6">
          <select
            className="appearance-none outline-none border-gray-700 border-2 w-full max-h-3200"
            size={conditions.length}
            value={selectedCode}
            onChange={(ev) => setSelectedCode(ev.target.value)}
          >
            {conditions.map((condition) => (
              <option
                className="text-lg"
                key={condition.code}
                label={`${condition.description} (${condition.code})`}
                value={condition.code}
              ></option>
            ))}
          </select>
          <button
            className="p-2 text-white transition-colors duration-150 bg-green-500 rounded-lg focus:shadow-outline hover:bg-green-400 disabled:opacity-50"
            onClick={() =>
              selectedCode && onSetCondition(currentCase._id, selectedCode)
            }
            disabled={!selectedCode}
          >
            Submit and get next
          </button>
        </form>
      </div>
    </div>
  );
}
