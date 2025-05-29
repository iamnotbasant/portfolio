import React, { useEffect, useState } from "react";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { motion } from "framer-motion";
import {
  Code,
  Terminal,
  Clock,
  HardDrive,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  FileCode,
} from "lucide-react";

const ProfileSubmission = () => {
  const { submissions, getAllSubmissions } = useSubmissionStore();
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getAllSubmissions();
  }, [getAllSubmissions]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
      case "ACCEPTED":
        return "pill-success";
      case "Wrong Answer":
        return "pill-danger";
      case "Time Limit Exceeded":
        return "pill-warning";
      default:
        return "pill-primary";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const toggleExpand = (id) => {
    if (expandedSubmission === id) {
      setExpandedSubmission(null);
    } else {
      setExpandedSubmission(id);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    if (filter === "all") return true;
    return submission.status === filter;
  });

  const acceptedSubmissionsCount = submissions.filter(
    (s) => s.status === "Accepted" || s.status === "ACCEPTED"
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="profile-component-card p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="profile-component-header flex items-center gap-2">
          <FileCode className="w-5 h-5 text-red-500" /> Submission History
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-black/20 text-white border border-white/10 rounded-md py-1 px-3 pr-8 appearance-none focus:outline-none focus:border-red-500/50 w-full"
            >
              <option value="all">All Submissions</option>
              <option value="Accepted">Accepted</option>
              <option value="Wrong Answer">Wrong Answer</option>
              <option value="Time Limit Exceeded">Time Limit Exceeded</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/50">
              <Filter size={14} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="stat-card bg-black/20 border border-white/10 rounded-md p-3 text-center">
              <div className="text-xs text-white/60">Total</div>
              <div className="text-xl font-medium text-white">
                {submissions.length}
              </div>
            </div>
            <div className="stat-card bg-black/20 border border-white/10 rounded-md p-3 text-center">
              <div className="text-xs text-white/60">Accepted</div>
              <div className="text-xl font-medium text-emerald-500">
                {acceptedSubmissionsCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 className="text-xl font-medium text-white mb-2">
            No submissions found
          </h3>
          <p className="text-white/70">
            You haven't submitted any solutions yet, or none match your current
            filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <motion.div
              key={submission.id}
              className="playlist-card overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => toggleExpand(submission.id)}
              >
                <div className="flex flex-col md:flex-row gap-3 md:items-center w-full">
                  <div
                    className={`profile-pill ${getStatusClass(
                      submission.status
                    )} flex items-center gap-1`}
                  >
                    {submission.status === "Accepted" ? (
                      <Check size={12} />
                    ) : null}
                    {submission.status}
                  </div>

                  <div className="flex items-center gap-2 text-white/70">
                    <Code size={14} />
                    <span className="font-medium text-white">
                      {submission.language}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Clock size={14} />
                    <span>{formatDate(submission.createdAt)}</span>
                  </div>
                </div>

                <div>
                  {expandedSubmission === submission.id ? (
                    <ChevronUp className="text-white/70" />
                  ) : (
                    <ChevronDown className="text-white/70" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedSubmission === submission.id && (
                <motion.div
                  className="mt-4 pt-4 border-t border-white/10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Code Section */}
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-white mb-2 flex items-center gap-2">
                      <Code size={16} />
                      Solution Code
                    </h3>
                    <pre className="bg-black/30 text-white/90 p-4 rounded-lg overflow-x-auto border border-white/5 text-sm">
                      <code>{submission.sourceCode}</code>
                    </pre>
                  </div>

                  {/* Input/Output Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-md font-medium text-white/70 mb-2 flex items-center gap-2">
                        <Terminal size={14} />
                        Input
                      </h3>
                      <pre className="bg-black/30 text-white/70 p-3 rounded-lg overflow-x-auto border border-white/5 text-xs h-24">
                        <code>{submission.stdin || "No input provided"}</code>
                      </pre>
                    </div>

                    <div>
                      <h3 className="text-md font-medium text-white/70 mb-2 flex items-center gap-2">
                        <Terminal size={14} />
                        Output
                      </h3>
                      <pre className="bg-black/30 text-white/70 p-3 rounded-lg overflow-x-auto border border-white/5 text-xs h-24">
                        <code>
                          {Array.isArray(JSON.parse(submission.stdout))
                            ? JSON.parse(submission.stdout).join("")
                            : submission.stdout || "No output"}
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 bg-black/20 p-3 rounded-lg border border-white/5">
                      <Clock className="text-blue-400 w-10 h-10" />
                      <div>
                        <div className="text-white/60 text-xs">
                          Execution Time
                        </div>
                        <div className="text-white text-lg">
                          {Array.isArray(JSON.parse(submission.time))
                            ? JSON.parse(submission.time)[0]
                            : submission.time || "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-black/20 p-3 rounded-lg border border-white/5">
                      <HardDrive className="text-purple-400 w-10 h-10" />
                      <div>
                        <div className="text-white/60 text-xs">Memory Used</div>
                        <div className="text-white text-lg">
                          {Array.isArray(JSON.parse(submission.memory))
                            ? JSON.parse(submission.memory)[0]
                            : submission.memory || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProfileSubmission;
