import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { TabsBaseProps } from "./types";

const TabsBase = ({ tabs, defaultValue, value, onValueChange, className }: TabsBaseProps) => {
  const firstValue = tabs[0]?.value;

  return (
    <Tabs
      defaultValue={defaultValue ?? firstValue}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full mt-4", className)}
    >
      <TabsList variant="line" className="w-full justify-start border-b border-outline-variant/20 rounded-none bg-transparent pb-0 mb-4 h-auto">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className="gap-2 rounded-none border-0 pb-3 data-active:border-b-2 data-active:border-primary data-active:text-primary"
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsBase;
