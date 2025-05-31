import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  RefreshCw,
  Lightbulb,
  Code,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useAIAssistantStore } from "../store/useAIAssistantStore";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/AIChatPanel.css";

const AIChatPanel = ({ problem, code, language }) => {
  const [prompt, setPrompt] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const { isLoading, getAIHelp, history, clearChat } = useAIAssistantStore();
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    await getAIHelp(prompt, problem?.id, code, language);
    setPrompt("");
  };

  const handleQuickPrompt = async (quickPrompt) => {
    await getAIHelp(quickPrompt, problem?.id, code, language);
  };

  return (
    <motion.div
      className={`ai-chat-panel ${minimized ? "minimized" : ""} ${
        isExpanded ? "expanded" : ""
      }`}
      initial={{ height: 400, opacity: 0, y: 50 }}
      animate={{
        height: minimized ? 48 : isExpanded ? 600 : 400,
        opacity: 1,
        y: 0,
        width: isExpanded ? "95%" : "380px",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="ai-chat-header">
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-emerald-400" />
          <span className="text-white font-semibold">Alfred AI</span>
          {isLoading && (
            <RefreshCw size={14} className="animate-spin text-white/50" />
          )}
        </div>

        <div className="flex gap-2">
          {!minimized && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white/60 hover:text-white"
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          )}
          <button
            onClick={() => setMinimized(!minimized)}
            className="text-white/60 hover:text-white"
          >
            {minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Quick prompt buttons */}
          {history.length === 0 && (
            <div className="quick-prompts">
              <button
                onClick={() =>
                  handleQuickPrompt("Help me understand this problem")
                }
              >
                <Lightbulb size={14} />
                Understand this problem
              </button>
              <button
                onClick={() =>
                  handleQuickPrompt("What's the approach to solve this?")
                }
              >
                <Code size={14} />
                Solution approach
              </button>
              <button onClick={() => handleQuickPrompt("Debug my code")}>
                <RefreshCw size={14} />
                Debug my code
              </button>
            </div>
          )}

          {/* Chat messages */}
          <div className="ai-chat-messages">
            {history.length === 0 ? (
              <div className="empty-state">
                <Bot size={32} />
                <p>Ask me anything about this problem or your code!</p>
              </div>
            ) : (
              <AnimatePresence>
                {history.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`chat-message ${message.role}`}
                  >
                    {message.role === "assistant" ? (
                      <div className="markdown-content">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="ai-chat-input">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask Alfred a question..."
              disabled={isLoading}
              className="w-full"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={`send-button ${!prompt.trim() ? "disabled" : ""}`}
            >
              <Send size={16} />
            </button>

            {history.length > 0 && (
              <button
                type="button"
                onClick={clearChat}
                className="clear-button"
                title="Clear chat"
              >
                <X size={14} />
              </button>
            )}
          </form>
        </>
      )}
    </motion.div>
  );
};

export default AIChatPanel;
