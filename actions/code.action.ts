
import axios from "axios";
import React from "react";

interface Props {
  code: string;
  setCodeOutput: React.Dispatch<React.SetStateAction<string>>;
}

export const runCode = async ({code, setCodeOutput}: Props) => {
  try {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: "typescript",
        version: "*",
        files: [{ name: "main.ts", content: code }],
      }
    );

    const { run } = response.data;

    if (run.stderr) {
      setCodeOutput(`Error: ${run.stderr}`);
    } else if (run.stdout) {
      setCodeOutput(run.stdout);
    } else {
      setCodeOutput("Code executed successfully");
    }
  } catch (err) {
    setCodeOutput(`Error: ${(err as Error).message}`);
  }
};
