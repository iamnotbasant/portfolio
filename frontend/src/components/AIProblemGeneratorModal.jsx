import React, { useState } from "react";
import { axiosInstance } from "../libs/axios";
import { Toast } from "../store/useToastStore";
import { Loader } from "./Loader";
import { Sparkles, Bot, X } from "lucide-react";
import "../styles/ProblemForm.css";

const AIProblemGeneratorModal = ({ isOpen, onClose, onProblemGenerated }) => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [category, setCategory] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      Toast.error("Please enter a topic for the problem");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axiosInstance.post("/ai/generate-problem", {
        topic,
        difficulty,
        category,
        additionalRequirements: additionalRequirements.trim(),
      });

      onProblemGenerated(response.data.problem);
      Toast.success("Problem generated successfully!");
      onClose();
    } catch (error) {
      console.error("Error generating problem:", error);
      Toast.error(
        error.response?.data?.message || "Failed to generate problem"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bot size={24} />
            <Sparkles size={16} className="text-yellow-500" />
            AI Problem Generator
          </h2>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Topic <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g., Binary Trees, Dynamic Programming, Graph Traversal"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
              <label className="label">
                <span className="label-text-alt text-base-content/70">
                  The main concept or algorithm the problem should focus on
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Difficulty</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Category/Tags</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g., Arrays, Searching, Greedy Algorithms"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Additional Requirements
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-20"
                placeholder="Any specific constraints or requirements for the problem"
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isGenerating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader size={16} /> Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Generate Problem
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIProblemGeneratorModal;
