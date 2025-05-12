import React from "react";
import { useToastStore } from "../store/useToastStore";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ToastContainer.css";

// Import SVG icons
import { CheckCircle, XCircle, AlertCircle, Info } from "react-feather";

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <XCircle className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getTypeClasses = (type) => {
    switch (type) {
      case "success":
        return "bg-[#ECFDF3] text-[#027A48] border-[#6CE9A6]";
      case "error":
        return "bg-[#FEF3F2] text-[#B42318] border-[#FEE4E2]";
      case "warning":
        return "bg-[#FFFAEB] text-[#B54708] border-[#FEF0C7]";
      default:
        return "bg-[#EFF8FF] text-[#1570EF] border-[#B2DDFF]";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 min-w-[320px] max-w-[420px]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start justify-center gap-3 p-4 rounded-lg border shadow-lg mb-4 ${getTypeClasses(
              toast.type
            )}`}
          >
            {/* Icon */}
            <span className="flex-shrink-0">{getIcon(toast.type)}</span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h3 className="font-semibold text-sm">{toast.title}</h3>
              )}
              <p className="text-sm">{toast.message}</p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:opacity-75 transition-opacity duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  className={
                    toast.type === "error" ? "fill-[#B42318]" : "fill-current"
                  }
                  d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
                />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
