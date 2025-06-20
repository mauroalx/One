"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2, Pause, Play } from "lucide-react";
import clsx from "clsx";

interface LogItem {
  id: number;
  timestamp: string;
  type: "Auth" | "Info";
  message: string;
}

const mockLogs: LogItem[] = [
  { id: 1, timestamp: "2025-06-19 21:53:41", type: "Info", message: "Released IP 10.24.2.99 (did cli cc:32:e5:fe:8e:bd user hugodias@fibareds)" },
  { id: 2, timestamp: "2025-06-19 21:53:27", type: "Auth", message: "Login OK: [monicaacair@edstelecom.br] (from client EDS-BNG port 7360512 cli D8:0D:17:DD:BE:B4)" },
  { id: 3, timestamp: "2025-06-19 21:53:25", type: "Info", message: "Allocated IP: 10.24.1.43 from bloqueados (did cli D8:0D:17:DD:BE:B4 port 7360512 user monicaacair@edstelecom.br)" },
  { id: 4, timestamp: "2025-06-19 21:53:25", type: "Auth", message: "Login OK: [francinaldonunes@fibraeds] (from client EDS-BNG port 7363524 cli 84:D8:1B:88:28:50)" },
  { id: 5, timestamp: "2025-06-19 21:53:24", type: "Info", message: "Released IP 100.66.1.56 (did cli 84:d8:1b:88:28:50 user francinaldonunes@fibraeds)" },
  { id: 6, timestamp: "2025-06-19 21:53:20", type: "Info", message: "Released IP 10.24.1.43 (did cli d8:0d:17:dd:be:b4 user monicaacair@edstelecom.br)" },
  { id: 7, timestamp: "2025-06-19 21:53:06", type: "Auth", message: "Login incorrect (): [campeonato/] (from client EDS-BNG port 7362514 cli 84:D8:1B:76:9B:32)" },
];

const ITEMS_PER_PAGE = 5;

const NetworkRadiusLogsList: React.FC = () => {
  const [logs, setLogs] = useState<LogItem[]>(mockLogs);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [search, setSearch] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [newHighlight, setNewHighlight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        const newLog: LogItem = {
          id: logs.length + 1,
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
          type: Math.random() > 0.5 ? "Auth" : "Info",
          message: "Evento simulado automático ID " + (logs.length + 1),
        };
        setLogs((prev) => [newLog, ...prev]);
        setNewHighlight(newLog.id);
        setTimeout(() => setNewHighlight(null), 1500);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [logs, isPaused]);

  useEffect(() => {
    if (containerRef.current && !isPaused) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [logs, isPaused]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const filteredLogs = logs.filter(
    (log) =>
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.timestamp.includes(search)
  );

  const typeBadge = (type: LogItem["type"]) => {
    if (type === "Auth") {
      return (
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-semibold">
          Auth
        </span>
      );
    }
    return (
      <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-semibold">
        Info
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Buscar por usuário, IP, MAC, NAS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${isPaused ? 'bg-yellow-400 text-black' : 'bg-brand-500 text-white'} hover:opacity-90`}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? "Continuar" : "Pausar"}
          </button>
        </div>
      </div>

      <div ref={containerRef} className="flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
        {filteredLogs.slice(0, visibleCount).map((log) => (
          <div key={log.id} className={clsx("flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm transition-all", newHighlight === log.id && "ring-2 ring-brand-500 scale-[1.02]")}>            
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-brand-500 mb-1" />
              <div className="flex-1 w-px bg-gray-300 dark:bg-gray-700" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{log.timestamp}</span>
                {typeBadge(log.type)}
              </div>
              <div className="text-sm text-gray-800 dark:text-white whitespace-pre-wrap">
                {log.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredLogs.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Carregar mais
          </button>
        </div>
      )}
    </div>
  );
};

export default NetworkRadiusLogsList;
