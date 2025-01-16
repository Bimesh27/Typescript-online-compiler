"use client";

import Customizer from "@/components/Customizer";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [fontSize, setFontSize] = useState<number>(15);
  const defaultValue =
    "const helloMom = () => {\n \tconsole.log('Hello Mom');\n}";
  const [code, setCode] = useState(defaultValue);
  const [codeOutput, setCodeOutput] = useState<string>("");
  console.log(codeOutput);

  return (
    <div className="w-full max-h-[calc(100vh-4rem)] flex items-center overflow-hidden flex-col  ">
      <Customizer code={code} setCodeOutput={setCodeOutput} />
      <section className="w-full flex">
        <MonacoEditor
          language="typescript"
          theme={`${theme === "dark" ? "vs-dark" : "light"}`}
          height="80vh"
          width="50%"
          options={{
            fontSize,
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
        <div className="w-[50%] p-4">
          <p className="whitespace-pre-wrap">{codeOutput}</p>
        </div>
      </section>
    </div>
  );
}
