import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  List,
  Tag,
  ExternalLink,
  Folder,
  Trash2,
  Plus,
} from "lucide-react";

const PlaylistProfile = () => {
  const { getAllPlaylists, playlists, deletePlaylist } = usePlaylistStore();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const togglePlaylist = (id) => {
    if (expandedPlaylist === id) {
      setExpandedPlaylist(null);
    } else {
      setExpandedPlaylist(id);
    }
  };

  const handleDelete = async (id) => {
    await deletePlaylist(id);
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return <span className="profile-pill pill-success">Easy</span>;
      case "MEDIUM":
        return <span className="profile-pill pill-warning">Medium</span>;
      case "HARD":
        return <span className="profile-pill pill-danger">Hard</span>;
      default:
        return <span className="profile-pill">Unknown</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="profile-component-card p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="profile-component-header flex items-center gap-2">
          <Folder className="w-5 h-5 text-red-500" /> My Playlists
        </h2>
        <button className="profile-btn profile-btn-primary flex items-center gap-2">
          <Plus size={16} /> Create Playlist
        </button>
      </div>

      {playlists.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3 className="text-xl font-medium text-white mb-2">
            No playlists found
          </h3>
          <p className="text-white/70 mb-4">
            Create your first playlist to organize problems!
          </p>
          <button className="profile-btn profile-btn-primary flex items-center gap-2 mx-auto">
            <Plus size={16} /> Create Playlist
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {playlists.map((playlist) => (
            <motion.div
              key={playlist.id}
              className="playlist-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Playlist Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => togglePlaylist(playlist.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="playlist-badge">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {playlist.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <List size={14} />
                        <span>{playlist.problems.length} problems</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>Created {formatDate(playlist.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="text-white/70 hover:text-white transition-colors">
                  {expandedPlaylist === playlist.id ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </button>
              </div>

              {/* Description */}
              {playlist.description && (
                <p className="text-white/60 mt-3 ml-16">
                  {playlist.description}
                </p>
              )}

              {/* Expanded Problems List */}
              {expandedPlaylist === playlist.id && (
                <motion.div
                  className="mt-4 pt-4 border-t border-white/10 ml-16"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-semibold mb-3 text-white">
                    Problems in this playlist
                  </h4>

                  {playlist.problems.length === 0 ? (
                    <div className="p-4 bg-black/20 rounded-lg border border-white/5 text-white/60">
                      <span>No problems added to this playlist yet.</span>
                    </div>
                  ) : (
                    <div className="profile-table-card">
                      <table className="profile-table w-full">
                        <thead>
                          <tr>
                            <th>Problem</th>
                            <th>Difficulty</th>
                            <th>Tags</th>
                            <th className="text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {playlist.problems.map((item) => (
                            <tr key={item.id}>
                              <td className="font-medium text-white">
                                {item.problem.title}
                              </td>
                              <td>
                                {getDifficultyBadge(item.problem.difficulty)}
                              </td>
                              <td>
                                <div className="flex flex-wrap gap-1">
                                  {item.problem.tags &&
                                    item.problem.tags.map((tag, idx) => (
                                      <div
                                        key={idx}
                                        className="profile-pill pill-primary"
                                      >
                                        <Tag size={10} /> {tag}
                                      </div>
                                    ))}
                                </div>
                              </td>
                              <td className="text-right">
                                <Link
                                  to={`/problem/${item.problem.id}`}
                                  className="profile-btn profile-btn-outline inline-flex items-center gap-1 py-1 px-2 text-xs"
                                >
                                  <ExternalLink size={12} />
                                  Solve
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDelete(playlist.id)}
                      className="profile-btn flex items-center gap-1 bg-red-900/20 border border-red-500/30 text-red-400 hover:bg-red-900/40"
                    >
                      <Trash2 size={14} />
                      Delete Playlist
                    </button>
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

export default PlaylistProfile;
