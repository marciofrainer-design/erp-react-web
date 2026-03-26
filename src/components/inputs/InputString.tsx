import { Input } from "@/components/ui/input";

const InputString = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <Input value={value} onChange={(e) => onChange(e.target.value)} />
  );
};

export { InputString };