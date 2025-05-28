import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import { Toast } from "./useToastStore";

export const useExecutionStore = create((set, get) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (
    source_code,
    languageId,
    stdin,
    expectedOutput,
    problemId
  ) => {
    try {
      set({ isExecuting: true });
      console.log(
        "Submission:",
        JSON.stringify({
          source_code,
          languageId,
          stdin,
          expectedOutput,
          problemId,
        })
      );
      const res = await axiosInstance.post("/execution", {
        source_code,
        languageId,
        stdin,
        expectedOutput,
        problemId,
      });

      set({ submission: res.data.submission });

      Toast.success(res.data.message);
    } catch (error) {
      console.log("Error executing code", error);
      Toast.error("Error executing code");
    } finally {
      set({ isExecuting: false });
    }
  },
}));
