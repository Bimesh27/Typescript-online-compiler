"use client";

import Customizer from "@/components/Customiser";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useGlobalState } from "@/context/global.context";
import { getFromLocalStorage, setLocalStorage } from "@/lib/localStorageUtils";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ResizablePanelWrapper = () => {
  const { theme } = useTheme();

  const { fontSize } = useGlobalState();

  const [defaultValue, setDefaultValue] = useState(
    "const helloMom = () => {\n \tconsole.log('Hello Mom');\n} \n \nhelloMom()"
  );

  const [code, setCode] = useState<string>(defaultValue);
  const [codeOutput, setCodeOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [outputFooter, setOutputFooter] = useState<string>("");

  const runCode = async () => {
    try {
      setIsLoading(true);
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
        setOutputFooter("== Code Executed Successfully ✨ ==");
      } else {
        setCodeOutput("Code executed successfully ✨");
      }
    } catch (err) {
      setCodeOutput(`Error: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCode(getFromLocalStorage("default-value") || defaultValue);
  },[])

  return (
    <div className="w-full max-h-[calc(100vh-4rem)] flex items-center overflow-hidden flex-col">
      <ResizablePanelGroup
        className="min-h[calc(100vh-16rem)] w-full border"
        direction="horizontal"
      >
        <ResizablePanel defaultSize={60} minSize={40}>
          <Customizer
            CustomiserSide="left"
            isLoading={isLoading}
            runCode={runCode}
          />
          <MonacoEditor
            language="typescript"
            theme={`${theme === "dark" ? "vs-dark" : "light"}`}
            height="80vh"
            options={{
              fontSize: getFromLocalStorage("font-size") || fontSize,
              fontFamily: getFromLocalStorage("font-style") || "Fira Code",
              fontLigatures: true,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
            value={getFromLocalStorage("default-value") || defaultValue}
            onChange={(value) => {
              setCode(value || "");
              setDefaultValue(value || "");
              setLocalStorage("default-value", value || "");
            }}
            className="overflow-hidden"
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40} minSize={25}>
          <Customizer
            CustomiserSide={"right"}
            isLoading={isLoading}
            runCode={runCode}
          />
          <div className="whitespace-pre-wrap p-4">
            <p>{codeOutput} </p>
            <p className="text-center text-sm text-[#32CD32] tracking-wide">
              {outputFooter}
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizablePanelWrapper;
