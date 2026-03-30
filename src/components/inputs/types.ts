export type InputProps = {
  label: string;
  value: string;
  width?: string;
  error?: string;
  onChange: (value: string) => void;
};

export type InputBaseProps = {
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
