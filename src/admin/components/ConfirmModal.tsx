"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface Props {
  open:      boolean;
  title:     string;
  message:   string;
  onConfirm: () => void;
  onCancel:  () => void;
  danger?:   boolean;
  loading?:  boolean;
}

const ConfirmModal = ({ open, title, message, onConfirm, onCancel, danger = true, loading = false }: Props) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 350 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        >
          <div className="flex items-start gap-4 mb-5">
            {danger && (
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            )}
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{message}</p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                danger ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Deleting…" : danger ? "Delete" : "Confirm"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ConfirmModal;
