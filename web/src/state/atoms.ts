import { atom } from "recoil";

export const shouldRefetchNotebookState = atom({
  key: "shouldRefetchNotebookState",
  default: false,
});
