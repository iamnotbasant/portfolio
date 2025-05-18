import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const ProblemTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  const isAdmin = authUser?.role === "ADMIN";
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    tags: "",
    difficulty: "",
  });

  const difficultyOptions = ["EASY", "MEDIUM", "HARD"];

  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    const tagsSet = new Set();
    problems.forEach((problem) => {
      problem.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    return problems.filter((problem) => {
      const matchesSearch =
        filters.search === "" ||
        problem.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesTags =
        filters.tags === "" || problem.tags?.includes(filters.tags);
      const matchesDifficulty =
        filters.difficulty === "" || problem.difficulty === filters.difficulty;

      return matchesSearch && matchesTags && matchesDifficulty;
    });
  }, [problems, filters]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = useMemo(
    () => filteredProblems.slice(startIndex, endIndex),
    [filteredProblems, startIndex, endIndex]
  );

  const handleAddToPlaylist = (problemId) => {};
  const handleDelete = (problemId) => {};

  return (
    <div>
      {/* filters  */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "backInOut" }}
        className="dash-card mb-2 mt-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search problems..."
            className=" px-4 py-2 text-white filter-input"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            placeholder="Filter by tags..."
            className="px-4 py-2 text-white filter-input"
            value={filters.tags}
            onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
          >
            <option className="bg-black/90" value="">
              All Tags
            </option>
            {allTags.map((tag) => (
              <option className="bg-black/90" key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 filter-input"
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
          >
            <option className="bg-black/90" value="">
              All Difficulties
            </option>
            {difficultyOptions.map((option) => (
              <option className="bg-black/90" key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* table  */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "backInOut" }}
        className="table-card "
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/30">
              <th className="text-left py-2 text-white/80 neue-med">Status</th>
              <th className="text-left py-2 text-white/80 neue-med">Title</th>
              <th className="text-left py-2 text-white/80 neue-med">Tags</th>
              <th className="text-left py-2 text-white/80 neue-med">
                Difficulty
              </th>
              <th className="text-left py-2 text-white/80 neue-med">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((problem) => {
              const isSolved = problem.solvedBy.some(
                (user) => user.id === authUser?.id
              );
              return (
                <tr
                  key={problem.id}
                  className="border-b border-white/30 hover:bg-white/10 transition-all duration-200 ease-in-out"
                >
                  <td className="py-2">
                    {isSolved ? (
                      <span className="text-green-500">☑️</span>
                    ) : (
                      <Link to={`/problems/${problem.id}`}>
                        <span className="text-red-700 text-base ml-1 arame">
                          X
                        </span>
                      </Link>
                    )}
                  </td>
                  <td className="py-2 text-white">{problem.title}</td>
                  <td className="py-2">
                    {problem.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td className="py-2">
                    <span
                      className={` text-white px-2 py-1 rounded-full ${
                        problem.difficulty === "EASY"
                          ? "bg-emerald-900/60 text-emerald-400 border border-emerald-700"
                          : problem.difficulty === "MEDIUM"
                          ? "bg-amber-900/60 text-amber-400 border border-amber-700"
                          : "bg-red-900/60 text-red-300 border border-red-700"
                      }`}
                    >
                      {problem.difficulty.charAt(0).toUpperCase() +
                        problem.difficulty.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => handleAddToPlaylist(problem.id)}
                      className="mr-4"
                    >
                      💾
                    </button>
                    {isAdmin && (
                      <button onClick={() => handleDelete(problem.id)}>
                        🗑️
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            <tr className="border-b border-white/30">
              <td className="py-2">☑️</td>
              <td className="py-2 text-white"> Two Sum Two Sum Two Sum </td>
              <td className="py-2">
                <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white mr-2">
                  Array
                </span>
                <span className="bg-white/10 px-2 py-1 rounded-full text-sm text-white">
                  Hash Table
                </span>
              </td>
              <td className="py-2 text-white">MEDIUM</td>
              <td className="py-2">
                <button className="text-white hover:text-blue-300 mr-4">
                  💾
                </button>
                {isAdmin && (
                  <button className="text-red-200 hover:text-red-300">
                    🗑️
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ProblemTable;
