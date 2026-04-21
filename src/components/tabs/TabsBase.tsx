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
      <TabsList className="justify-start flex-wrap gap-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className="flex-none gap-2 border-2 hover:border-primary"
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
