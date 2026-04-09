export type TabsBaseTab = {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

export type TabsBaseProps = {
  tabs: TabsBaseTab[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};