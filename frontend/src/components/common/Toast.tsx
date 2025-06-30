"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  type?: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, type = "success" }) => {
  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
  const Icon = type === "success" ? CheckCircle : XCircle;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg ${bgColor} text-white px-5 py-3 shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white" />
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
