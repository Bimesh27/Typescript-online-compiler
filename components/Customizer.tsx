
import { PlayIcon, SquareTerminal } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { FaCode } from "react-icons/fa";
import React, { SetStateAction } from "react";
import { runCode } from "@/actions/code.action";

interface Props {
  code: string;
  setCodeOutput: React.Dispatch<SetStateAction<string>>;
}

const Customizer = ({ code, setCodeOutput }: Props) => {
  const handleRun = () => {
    runCode({ code, setCodeOutput });
  };

  return (
    <div className="w-full h-14 flex">
      <section className="flex-1 border-b w-full flex items-center px-10 justify-between">
        <div className="flex w-full items-center">
          <p className="mr-4 flex gap-2 items-center font-semibold">
            Code <FaCode className="mt-[2px] text-blue-500 text-2xl" />
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 transition-all dark:text-white"
          onClick={handleRun}
        >
          Run <PlayIcon />
        </Button>
      </section>
      <Separator orientation="vertical" className="" />
      <section className="flex-1 border-b w-full flex items-center px-10">
        <p className="font-semibold flex items-center gap-3">
          Output <SquareTerminal />
        </p>
      </section>
    </div>
  );
};

export default Customizer;
