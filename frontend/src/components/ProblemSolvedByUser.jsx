import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Tag,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Circle,
  Award,
  BarChart4,
} from "lucide-react";

const ProblemSolvedByUser = () => {
  const { getSolvedProblemByUser, solvedProblems } = useProblemStore();

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  // Function to get difficulty badge styling
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return (
          <div className="profile-pill pill-success flex items-center gap-1">
            <CheckCircle size={12} />
            Easy
          </div>
        );
      case "MEDIUM":
        return (
          <div className="profile-pill pill-warning flex items-center gap-1">
            <Circle size={12} />
            Medium
          </div>
        );
      case "HARD":
        return (
          <div className="profile-pill pill-danger flex items-center gap-1">
            <AlertTriangle size={12} />
            Hard
          </div>
        );
      default:
        return <div className="profile-pill">Unknown</div>;
    }
  };

  const easyCount = solvedProblems.filter(
    (p) => p.difficulty === "EASY"
  ).length;
  const mediumCount = solvedProblems.filter(
    (p) => p.difficulty === "MEDIUM"
  ).length;
  const hardCount = solvedProblems.filter(
    (p) => p.difficulty === "HARD"
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="profile-component-card p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="profile-component-header flex items-center gap-2">
          <Award className="w-5 h-5 text-red-500" /> Problems Solved
        </h2>
        <Link
          to="/problems"
          className="profile-btn profile-btn-primary flex items-center gap-1"
        >
          <ExternalLink size={16} /> Browse Problems
        </Link>
      </div>

      {/* Stats Grid - Always visible */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card bg-black/20 border border-white/10 rounded-md p-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-white/60">Easy</div>
            <div className="text-3xl font-medium text-emerald-500">
              {easyCount}
            </div>
          </div>
          <div className="rounded-full bg-emerald-500/20 p-3">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
          </div>
        </div>

        <div className="stat-card bg-black/20 border border-white/10 rounded-md p-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-white/60">Medium</div>
            <div className="text-3xl font-medium text-amber-500">
              {mediumCount}
            </div>
          </div>
          <div className="rounded-full bg-amber-500/20 p-3">
            <Circle className="w-6 h-6 text-amber-500" />
          </div>
        </div>

        <div className="stat-card bg-black/20 border border-white/10 rounded-md p-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-white/60">Hard</div>
            <div className="text-3xl font-medium text-red-500">{hardCount}</div>
          </div>
          <div className="rounded-full bg-red-500/20 p-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>

      {solvedProblems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏆</div>
          <h3 className="text-xl font-medium text-white mb-2">
            No problems solved yet
          </h3>
          <p className="text-white/70 mb-4">
            Start solving problems to see them listed here!
          </p>
          <Link
            to="/problems"
            className="profile-btn profile-btn-primary inline-flex items-center gap-2"
          >
            <ExternalLink size={16} /> View Problems
          </Link>
        </div>
      ) : (
        <div className="profile-table-card">
          <table className="profile-table w-full">
            <thead>
              <tr>
                <th>Problem</th>
                <th>Difficulty</th>
                <th>Tags</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {solvedProblems.map((problem) => (
                <tr key={problem.id}>
                  <td className="font-medium text-white">{problem.title}</td>
                  <td>{getDifficultyBadge(problem.difficulty)}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {problem.tags &&
                        problem.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="profile-pill pill-primary flex items-center gap-1"
                          >
                            <Tag size={10} /> {tag}
                          </div>
                        ))}
                    </div>
                  </td>
                  <td className="text-right">
                    <Link
                      to={`/problems/${problem.id}`}
                      className="profile-btn profile-btn-outline inline-flex items-center gap-1 py-1 px-2 text-xs"
                    >
                      <ExternalLink size={14} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {solvedProblems.length > 5 && (
            <div className="flex justify-center p-3 border-t border-white/10">
              <button className="profile-btn flex items-center gap-2 bg-black/30 text-white/70 hover:text-white border border-white/10">
                <BarChart4 size={16} /> View All {solvedProblems.length} Solved
                Problems
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProblemSolvedByUser;
