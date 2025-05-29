import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRevisionStore } from "../store/useRevisionStore";
import { useProblemStore } from "../store/useProblemStore";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { BookmarkCheck, ArrowLeft, ExternalLink } from "lucide-react";
import { Loader } from "../components/Loader";

const RevisionProblems = () => {
  const navigate = useNavigate();
  const {
    revisionProblems,
    getRevisionProblems,
    removeFromRevision,
    isLoading,
  } = useRevisionStore();
  const { problems, getProblems } = useProblemStore();

  useEffect(() => {
    getRevisionProblems();
    if (!problems.length) {
      getProblems();
    }
  }, [getRevisionProblems, getProblems, problems.length]);

  // Get full problem details from the problem store
  const revisionProblemsWithDetails = revisionProblems.map((revItem) => {
    const problem = problems.find((p) => p.id === revItem.problemId);
    return {
      ...revItem,
      problemDetails: problem || null,
    };
  });

  const handleRemoveFromRevision = (problemId, e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromRevision(problemId);
  };

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "bg-emerald-900/60 text-emerald-400 border border-emerald-700";
      case "MEDIUM":
        return "bg-amber-900/60 text-amber-400 border border-amber-700";
      case "HARD":
        return "bg-red-900/60 text-red-300 border border-red-700";
      default:
        return "bg-gray-900/60 text-gray-300 border border-gray-700";
    }
  };

  return (
    <div className="bg-[#101010] dashboard-container min-h-screen mx-auto">
      <div className="max-w-[1200px] mx-auto">
        <Navbar />
        <Sidebar />

        <div className="mt-8 mb-6">
          <Link
            to="/dashboard"
            className="text-white/80 hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-white text-3xl flex items-center gap-3">
            <BookmarkCheck className="text-purple-400" size={28} />
            Problems Saved for Revision
          </h1>
        </div>

        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader />
          </div>
        ) : revisionProblemsWithDetails.length === 0 ? (
          <div className="bg-black/20 p-8 rounded-lg border border-white/10 text-center">
            <BookmarkCheck className="w-12 h-12 text-purple-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-white mb-2">
              No problems saved for revision
            </h3>
            <p className="text-white/60 mb-6">
              When you find problems you want to revise later, save them for
              quick access.
            </p>
            <Link
              to="/problems"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Browse Problems
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="table-card"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/30">
                  <th className="text-left py-2 text-white/80">Problem</th>
                  <th className="text-left py-2 text-white/80">Difficulty</th>
                  <th className="text-left py-2 text-white/80">Tags</th>
                  <th className="text-right py-2 text-white/80">Actions</th>
                </tr>
              </thead>
              <tbody>
                {revisionProblemsWithDetails.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/30 hover:bg-white/10 cursor-pointer"
                    onClick={() => navigate(`/problem/${item.problemId}`)}
                  >
                    <td className="py-4 font-medium text-white">
                      {item.problemDetails?.title || "Loading..."}
                    </td>
                    <td className="py-4">
                      {item.problemDetails ? (
                        <span
                          className={`px-3 py-1 rounded-full ${getDifficultyClass(
                            item.problemDetails.difficulty
                          )}`}
                        >
                          {item.problemDetails.difficulty
                            .charAt(0)
                            .toUpperCase() +
                            item.problemDetails.difficulty
                              .slice(1)
                              .toLowerCase()}
                        </span>
                      ) : (
                        "Loading..."
                      )}
                    </td>
                    <td className="py-4">
                      {item.problemDetails?.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={(e) =>
                            handleRemoveFromRevision(item.problemId, e)
                          }
                          className="p-1.5 hover:bg-red-900/30 rounded-full transition-colors"
                          title="Remove from revision"
                        >
                          <BookmarkCheck size={16} className="text-red-400" />
                        </button>
                        <Link
                          to={`/problem/${item.problemId}`}
                          className="p-1.5 hover:bg-blue-900/30 rounded-full transition-colors"
                          title="View problem"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} className="text-blue-400" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RevisionProblems;
