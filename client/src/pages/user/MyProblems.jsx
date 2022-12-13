import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProblemCard from "../../components/ProblemCard/ProblemCard";
import { getMyProblems } from "../../network";
function MyProblems() {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    fetchProblems();
  }, []);
  const fetchProblems = async () => {
    const fetchedProblems = await getMyProblems();
    setProblems(fetchedProblems);
  };
  return (
    <div>
      {problems.map((problem) => (
        <ProblemCard problem={problem} />
      ))}
    </div>
  );
}

export default MyProblems;
