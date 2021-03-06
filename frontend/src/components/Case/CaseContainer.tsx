import { useContext, useEffect, useState } from "react";
import { API_URL } from "../../constants";
import ApplicationContext from "../ApplicationProvider";
import CaseConditions, { Case, Condition } from "./CaseConditions";
import CaseDescription from "./CaseDescription";

async function getNextCaseFromApi(jwt: string) {
  try {
    const res = await fetch(`${API_URL}/cases/unlabeled`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const nextCase = await res.json();
    return nextCase;
  } catch (err) {
    return null;
  }
}

async function getConditionsFromApi(jwt: string) {
  const res = await fetch(`${API_URL}/cases/conditions`, {
    method: "get",
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.json();
}

async function setConditionCode(jwt: string, caseId: string, code: string) {
  const res = await fetch(`${API_URL}/cases/${caseId}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  return res.json();
}

export default function CaseContainer() {
  const [currentCase, setCase] = useState<Case | null>(null);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const { jwt } = useContext(ApplicationContext);

  const onSetCondition = async (caseId: string, code: Condition["code"]) => {
    await setConditionCode(jwt as string, caseId, code);
    const nextCase = await getNextCaseFromApi(jwt as string);
    setCase(nextCase);
  };

  useEffect(() => {
    async function getNextUnlabeledCase() {
      try {
        const nextCase = await getNextCaseFromApi(jwt as string);
        setCase(nextCase);
      } catch (err) {
        console.error(err);
      }
    }

    async function getConditions() {
      try {
        const conditions = await getConditionsFromApi(jwt as string);
        setConditions(conditions);
      } catch (err) {
        console.error(err);
      }
    }
    getNextUnlabeledCase();
    getConditions();
  }, []);

  return currentCase && conditions.length > 0 ? (
    <div className="flex flex-row w-full flex-wrap">
      <CaseDescription description={currentCase.description} />
      <CaseConditions
        currentCase={currentCase}
        conditions={conditions}
        onSetCondition={onSetCondition}
      />
    </div>
  ) : (
    <div>You are done!</div>
  );
}
