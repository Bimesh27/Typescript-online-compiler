"use client";
import Customizer from "@/components/Customizer";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [fontSize, setFontSize] = useState(20);
  const defaultValue = "const helloMom = () => {console.log('Hello MOm')}";
  const [code, setCode] = useState(defaultValue);
  const [codeOutput, setCodeOutput] = useState("");

  console.log(code);
  console.log(codeOutput);

  const runCode = async () => {
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

  return (
    <div className="w-full max-h-[calc(100vh-4rem)] flex items-center overflow-hidden flex-col">
      <Customizer/>
      <section className="w-full">
      <MonacoEditor
        language="typescript"
        theme={`${theme === "dark" ? "vs-dark" : "light"}`}
        height="80vh"
        width="50%"
        options={{
          fontSize,
        }}
        value={defaultValue}
        onChange={(value) => setCode(value || "")}
      />
      <div className="w-[50%]">
        <h1 className="text-blue-500">{codeOutput}</h1>
      </div>
      </section>
    </div>
  );
}
