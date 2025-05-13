import React from "react";
import ProblemForm from "../../components/ProblemForm";

const AddProblem = () => {
  return (
    <div className="bg-[#1f1f1f] min-h-screen ">
      <h1 className="text-white text-center neue-med text-3xl">Add problem</h1>
      <ProblemForm />
    </div>
  );
};

export default AddProblem;
