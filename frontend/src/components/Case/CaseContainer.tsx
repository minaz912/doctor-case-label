import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";
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

export default function CaseLayout() {
  const [currentCase, setCase] = useState<Case | null>(null);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [jwt] = useLocalStorage("jwt", null);

  const onSetCondition = async (caseId: string, code: Condition["code"]) => {
    await setConditionCode(jwt, caseId, code);
    const nextCase = await getNextCaseFromApi(jwt);
    setCase(nextCase);
  };

  useEffect(() => {
    async function getNextUnlabeledCase() {
      try {
        const nextCase = await getNextCaseFromApi(jwt);
        setCase(nextCase);
      } catch (err) {
        console.error(err);
      }
    }

    async function getConditions() {
      try {
        const conditions = await getConditionsFromApi(jwt);
        setConditions(conditions);
      } catch (err) {
        console.error(err);
      }
    }
    getNextUnlabeledCase();
    getConditions();
  }, []);

  return currentCase && conditions.length > 0 ? (
    <>
      <CaseDescription description={currentCase.description} />
      <CaseConditions
        currentCase={currentCase}
        conditions={conditions}
        onSetCondition={onSetCondition}
      />
    </>
  ) : (
    <div>You are done!</div>
  );
}
