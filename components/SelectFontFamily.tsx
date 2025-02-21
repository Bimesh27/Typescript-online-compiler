import { useGlobalState } from "@/context/global.context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFromLocalStorage, setLocalStorage } from "@/lib/localStorageUtils";

const SelectFontFamily = () => {
  const { font, setFont } = useGlobalState();

  const fontStyles = [
    "Fira Code",
    "JetBrains Mono",
    "Source Code Pro",
    "Roboto Mono",
    "Ubuntu Mono",
    "Inconsolata",
    "Overpass Mono",
    "IBM Plex Mono",
  ];

  return (
    <Select
      defaultValue={getFromLocalStorage("font-style") || font}
      onValueChange={(value) => {
        setFont(value);
        setLocalStorage("font-style", value);
      }}
    >
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Font size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {fontStyles.map((style) => (
            <SelectItem value={style} key={style}>
              {style}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFontFamily;
