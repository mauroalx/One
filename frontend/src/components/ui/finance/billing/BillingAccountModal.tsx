import React from "react";
import { Dialog } from "@headlessui/react";
import BillingAccountForm from "./BillingAccountForm";
import { BillingAccount } from "./BillingAccountsBoard";

interface BillingAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<BillingAccount>) => void;
  billingAccount?: BillingAccount;
}

const BillingAccountModal: React.FC<BillingAccountModalProps> = ({
  isOpen,
  onClose,
  onSave,
  billingAccount,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed w-full z-99999 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true"></div>

        <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-xl p-6 z-999999">
          <Dialog.Title className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {billingAccount ? "Editar Conta de Cobrança" : "Nova Conta de Cobrança"}
          </Dialog.Title>

          <BillingAccountForm
            billingAccount={billingAccount}
            onSave={(data) => {
              onSave(data);
              onClose();
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default BillingAccountModal;
