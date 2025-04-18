import { create } from "zustand";

export interface QrisTransactionDialog {
  url: string;
  qrString: string;
  isClosed: boolean;
}

interface DialogStore extends QrisTransactionDialog {
  openDialog: (data: QrisTransactionDialog) => void;
  closeDialog: () => void;
  onUnmountDialog: () => void;
}

const useDialog = create<DialogStore>((set) => ({
  url: "",
  qrString: "",
  isClosed: false,

  openDialog: (data) =>
    set(() => ({
      url: data.url,
      qrString: data.qrString,
      isClosed: false,
    })),

  closeDialog: () =>
    set(() => ({
      isClosed: true,
    })),

  onUnmountDialog: () =>
    set(() => ({
      url: "",
      qrString: "",
    })),
}));

export default useDialog;
