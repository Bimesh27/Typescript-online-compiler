"use client";

import Customizer from "@/components/Customiser";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useGlobalState } from "@/context/global.context";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useState } from "react";

const ResizablePanelWrapper = () => {
  const { theme } = useTheme();

  const { fontSize } = useGlobalState();

  const defaultValue =
    "const helloMom = () => {\n \tconsole.log('Hello Mom');\n} \n \nhelloMom()";

  const [code, setCode] = useState<string>(defaultValue);
  const [codeOutput, setCodeOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [outputFooter, setOutputFooter] = useState<string>("");
  console.log(fontSize);

  return (
    <div className="w-full max-h-[calc(100vh-4rem)] flex items-center overflow-hidden flex-col">
      <ResizablePanelGroup
        className="min-h[calc(100vh-16rem)] w-full border"
        direction="horizontal"
      >
        <ResizablePanel defaultSize={60} minSize={40}>
          <Customizer
            code={code}
            setCodeOutput={setCodeOutput}
            CustomiserSide="left"
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setOutputFooter={setOutputFooter}
          />
          <MonacoEditor
            language="typescript"
            theme={`${theme === "dark" ? "vs-dark" : "light"}`}
            height="80vh"
            options={{
              fontSize: Number(localStorage.getItem("font-size")) || fontSize,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
            value={defaultValue}
            onChange={(value) => setCode(value || "")}
            className="overflow-hidden"
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40} minSize={25}>
          <Customizer
            code={code}
            setCodeOutput={setCodeOutput}
            CustomiserSide={"right"}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setOutputFooter={setOutputFooter}
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
