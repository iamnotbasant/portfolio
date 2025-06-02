import React, { useEffect, useMemo } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
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
  Flame,
  Calendar,
  Clock,
  Trophy,
} from "lucide-react";

const ProblemSolvedByUser = () => {
  const { getSolvedProblemByUser, solvedProblems } = useProblemStore();
  const { submissions, getAllSubmissions } = useSubmissionStore();

  useEffect(() => {
    getSolvedProblemByUser();
    getAllSubmissions();
  }, [getSolvedProblemByUser, getAllSubmissions]);

  // Calculate streaks and activity metrics
  const streakStats = useMemo(() => {
    if (!submissions.length)
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActive: null,
        activeDaysMap: {},
      };

    // Parse all submission dates and sort them
    const submissionDates = submissions
      .map((s) => {
        const date = new Date(s.createdAt);
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ).getTime();
      })
      .sort();

    // Create a map of active days
    const activeDaysMap = {};
    submissionDates.forEach((timestamp) => {
      activeDaysMap[timestamp] = true;
    });

    // Get unique days
    const uniqueDays = [...new Set(submissionDates)].sort();

    // Calculate current streak (consecutive days from today/yesterday going backward)
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    const yesterdayTimestamp = todayTimestamp - 86400000;

    // Check if user submitted today or yesterday to start the streak
    let checkDate;
    if (activeDaysMap[todayTimestamp]) {
      currentStreak = 1;
      checkDate = todayTimestamp;
    } else if (activeDaysMap[yesterdayTimestamp]) {
      currentStreak = 1;
      checkDate = yesterdayTimestamp;
    } else {
      checkDate = null;
    }

    // Continue counting backward for consecutive days
    if (checkDate) {
      let prevDay = checkDate;
      while (true) {
        prevDay = prevDay - 86400000;
        if (activeDaysMap[prevDay]) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let currentRun = 0;
    for (let i = 1; i < uniqueDays.length; i++) {
      if (uniqueDays[i] - uniqueDays[i - 1] === 86400000) {
        // This is the next consecutive day
        currentRun++;
      } else {
        // Break in the streak
        longestStreak = Math.max(longestStreak, currentRun + 1);
        currentRun = 0;
      }
    }
    // Check the last run of the array
    longestStreak = Math.max(longestStreak, currentRun + 1);

    // Last active day
    const lastActive = uniqueDays.length
      ? new Date(uniqueDays[uniqueDays.length - 1])
      : null;

    return { currentStreak, longestStreak, lastActive, activeDaysMap };
  }, [submissions]);

  // Format date in a readable way
  const formatDate = (date) => {
    if (!date) return "Never";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

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

      {/* Streak Card - New component */}
      <div className="bg-black/30 border border-red-500/20 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-orange-500 w-5 h-5" />
          <h3 className="text-xl font-medium text-white">Your Coding Streak</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Streak */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-black/30 to-transparent p-4 rounded-lg border border-white/5">
            <div className="p-3 rounded-full bg-orange-500/20">
              <Flame className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <div className="text-white/60 text-xs font-medium">
                CURRENT STREAK
              </div>
              <div className="text-3xl font-bold text-white flex items-center gap-1">
                {streakStats.currentStreak}{" "}
                <span className="text-xs font-normal text-white/50">days</span>
              </div>
            </div>
          </div>

          {/* Longest Streak */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-black/30 to-transparent p-4 rounded-lg border border-white/5">
            <div className="p-3 rounded-full bg-purple-500/20">
              <Trophy className="w-7 h-7 text-purple-500" />
            </div>
            <div>
              <div className="text-white/60 text-xs font-medium">
                LONGEST STREAK
              </div>
              <div className="text-3xl font-bold text-white flex items-center gap-1">
                {streakStats.longestStreak}{" "}
                <span className="text-xs font-normal text-white/50">days</span>
              </div>
            </div>
          </div>

          {/* Last Activity */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-black/30 to-transparent p-4 rounded-lg border border-white/5">
            <div className="p-3 rounded-full bg-blue-500/20">
              <Clock className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <div className="text-white/60 text-xs font-medium">
                LAST ACTIVITY
              </div>
              <div className="text-lg font-medium text-white">
                {formatDate(streakStats.lastActive)}
              </div>
            </div>
          </div>
        </div>

        {/* Streak Tips */}
        {streakStats.currentStreak > 0 ? (
          <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="pt-0.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-green-300">
                You're on a {streakStats.currentStreak}-day streak! Keep solving
                problems daily to maintain your momentum!
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="pt-0.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-amber-300">
                Your streak is currently at 0. Solve a problem today to start
                building your streak!
              </p>
            </div>
          </div>
        )}
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
                <th>Companies</th>
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
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {problem.companyTags && problem.companyTags.length > 0 ? (
                        problem.companyTags.map((company, index) => (
                          <div
                            key={index}
                            className="profile-pill pill-primary flex items-center gap-1"
                          >
                            {company ? (
                              <span className="text-xs">{company}</span>
                            ) : (
                              <span className="text-xs">N/A</span>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="profile-pill pill-primary flex items-center gap-1">
                          <span className="text-xs">N/A</span>
                        </div>
                      )}
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
