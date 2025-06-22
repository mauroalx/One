import { ArrowRight, Plus } from "lucide-react";

export const CustomerInternetLogins: React.FC = () => {
  const mockLogins = [
    { id: 1, username: "joaosilva@isp", contractId: "C00123", createdAt: "2024-01-10", status: "online" },
    { id: 2, username: "mariaribeiro@isp", contractId: "C00456", createdAt: "2023-12-15", status: "bloqueado" },
    { id: 3, username: "carlosjunior@isp", contractId: "C00789", createdAt: "2024-03-01", status: "offline" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-start items-center">
        {/* <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Concentradores (NAS)</h2> */}
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium dark:bg-gray-600 dark:hover:bg-brand-500 hover:bg-brand-600 transition">
          <Plus className="w-4 h-4" /> Novo serviço
        </button>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockLogins.map((login) => (
            <div
            key={login.id}
            className="group p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
            >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white font-semibold text-lg">
                {login.username.charAt(0).toUpperCase()}
                </div>
                <div>
                <div className="text-lg font-semibold text-gray-800 dark:text-white truncate">{login.username}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Contrato: {login.contractId}</div>
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div className="space-y-1">
                <div className="text-xs text-gray-400">Cadastro</div>
                <div className="text-sm text-gray-800 dark:text-white">{login.createdAt}</div>
                </div>

                <div
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    login.status === "online"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : login.status === "bloqueado"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-red-100 text-red-800 dark:text-red-300 dark:bg-red-900"
                }`}
                >
                {login.status}
                </div>
            </div>
    {/* 
            <div className="flex justify-end mt-4">
                <span className="text-sm font-medium text-brand-500 group-hover:underline flex items-center gap-1">
                Detalhes <ArrowRight className="w-4 h-4" />
                </span>
            </div> */}
            </div>
        ))}
        </div>
    </div>
  );
};