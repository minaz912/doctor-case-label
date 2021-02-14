import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";
import CaseConditions, { Condition } from "./CaseConditions";
import CaseDescription from "./CaseDescription";

type Case = {
  _id: string;
  description: string;
};

async function getNextCaseFromApi(jwt: string) {
  const res = await fetch(`${API_URL}/cases/unlabeled`, {
    method: "get",
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.json();
}

async function getConditionsFromApi(jwt: string) {
  const res = await fetch(`${API_URL}/cases/conditions`, {
    method: "get",
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.json();
}

export default function CaseLayout() {
  const [currentCase, setCase] = useState<Case | null>(null);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [jwt] = useLocalStorage("jwt", null);

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
      <CaseConditions conditions={conditions} onSetCondition={() => {}} />
    </>
  ) : (
    <div>You are done!</div>
  );
}
