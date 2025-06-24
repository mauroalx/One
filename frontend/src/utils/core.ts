export interface PermissionGroup {
  groupLabel: string;
  groupKey: string;
  actions: { label: string; key: string }[];
}

export const permissions: PermissionGroup[] = [
  {
    groupLabel: "Comercial",
    groupKey: "comercial",
    actions: [
      { label: "Acessar módulo", key: "acessar" },
      { label: "Pesquisar clientes", key: "pesquisar_clientes" },
      { label: "Página do cliente", key: "acessar_cliente" },
      { label: "Modelos de contrato", key: "modelos_contrato" },
    ],
  },
  {
    groupLabel: "Financeiro",
    groupKey: "financeiro",
    actions: [
      { label: "Ver boletos", key: "ver_boletos" },
      { label: "Gerar cobranças", key: "gerar_cobrancas" },
    ],
  },
  {
    groupLabel: "Suporte",
    groupKey: "suporte",
    actions: [
      { label: "Acessar chamados", key: "chamados" },
      { label: "Fechar chamados", key: "fechar_chamados" },
    ],
  },
];