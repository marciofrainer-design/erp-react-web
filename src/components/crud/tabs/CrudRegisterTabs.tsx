import { motion } from "framer-motion";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import TabsBase from "@/components/tabs/TabsBase";
import type { CrudRegisterTabsProps } from "./types";

const CrudRegisterTabs = ({
  title,
  description,
  masterContent,
  details = [],
  detailsDisabled = false,
}: CrudRegisterTabsProps) => {
  const { t } = useAppTranslation(["components"]);

  const masterTab = {
    value: "master",
    label: t("tabs.master", { ns: "components", defaultValue: "Principal" }),
    content: (
      <div className="bg-surface-container-lowest rounded-xl shadow-ambient pt-4 pb-4">
        <form className="space-y-8">{masterContent}</form>
      </div>
    ),
  };

  const detailTabs = details.map((detail) => ({
    value: detail.value,
    label: detail.label,
    icon: detail.icon,
    disabled: detailsDisabled,
    content: detail.content,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col overflow-hidden max-w-5xl mx-auto w-full h-auto"
    >
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black font-headline tracking-tighter text-on-surface">
              {title}
            </h1>
            {description && (
              <p className="text-on-surface-variant">{description}</p>
            )}
          </div>
        </div>
      </div>
      <TabsBase tabs={[masterTab, ...detailTabs]} />
    </motion.div>
  );
};

export default CrudRegisterTabs;
