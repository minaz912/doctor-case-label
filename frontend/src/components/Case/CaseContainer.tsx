import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";
import CaseDescription from "./CaseDescription";

type Case = {
  _id: string;
  description: string;
};

async function getNextCase(jwt: string) {
  const res = await fetch(`${API_URL}/cases/unlabeled`, {
    method: "get",
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return res.json();
}

export default function CaseLayout() {
  const [currentCase, setCase] = useState<Case | null>(null);
  const [jwt] = useLocalStorage("jwt", null);

  useEffect(() => {
    async function getNextUnlabeledCase() {
      try {
        const nextCase = await getNextCase(jwt);
        setCase(nextCase);
      } catch (err) {
        console.error(err);
      }
    }
    getNextUnlabeledCase();
  }, []);

  return currentCase ? (
    <CaseDescription description={currentCase.description} />
  ) : (
    <div>You are done!</div>
  );
}
