import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppTranslation } from "@/i18n/useAppTranslation";
import { cn } from "@/lib/utils";
import { APP_SERVICE_TREE, type AppServiceNode } from "./treeSearch/";
import type { FormOption } from "./types";

export type ToolSearchProps = {
  selectedForm: FormOption | null;
  onSelectForm: (value: FormOption) => void;
};

function normalizeValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const ToolSearch = ({ selectedForm, onSelectForm }: ToolSearchProps) => {
  const { t } = useAppTranslation(["tools", "common"]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const getNodeLabel = useCallback(
    (node: AppServiceNode) => t(node.labelKey, node.labelKey, { ns: "tools" }),
    [t],
  );

  const filteredTree = useMemo(() => {
    const normalizedQuery = normalizeValue(query);

    const filterNode = (node: AppServiceNode): AppServiceNode | null => {
      const nodeLabel = normalizeValue(getNodeLabel(node));
      const formOptionMatch = node.formOption
        ? normalizeValue(node.formOption).includes(normalizedQuery)
        : false;

      if (!normalizedQuery) {
        return node;
      }

      const filteredChildren =
        node.children
          ?.map(filterNode)
          .filter((child): child is AppServiceNode => child !== null) ?? [];

      if (
        nodeLabel.includes(normalizedQuery) ||
        formOptionMatch ||
        filteredChildren.length > 0
      ) {
        return {
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : undefined,
        };
      }

      return null;
    };

    return APP_SERVICE_TREE.map(filterNode).filter(
      (node): node is AppServiceNode => node !== null,
    );
  }, [query, getNodeLabel]);

  const selectedFormLabel = selectedForm
    ? t(`appSearch.tree.${selectedForm}`, `appSearch.tree.${selectedForm}`, { ns: "tools" })
    : t("appSearch.noSelection", { ns: "tools" });

  const renderNode = (node: AppServiceNode, depth = 0) => {
    const hasChildren = Boolean(node.children?.length);
    const isSelectable = Boolean(node.formOption && node.enabled !== false);
    const nodeLabel = getNodeLabel(node);

    if (hasChildren) {
      return (
        <li key={node.id} className="space-y-1">
          <div
            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            style={{ paddingLeft: `${depth * 12}px` }}
          >
            {nodeLabel}
          </div>
          <ul className="space-y-1">
            {node.children?.map((child) => renderNode(child, depth + 1))}
          </ul>
        </li>
      );
    }

    return (
      <li key={node.id}>
        <button
          disabled={!isSelectable || !node.formOption}
          onClick={() => {
            if (!node.formOption || !isSelectable) return;
            onSelectForm(node.formOption);
            setQuery(nodeLabel);
            setIsOpen(false);
          }}
          className={cn(
            "w-full rounded-md px-2 py-2 text-left text-sm transition-colors",
            "flex items-center justify-between",
            isSelectable
              ? "hover:bg-accent hover:text-accent-foreground"
              : "cursor-not-allowed opacity-60",
            selectedForm === node.formOption && isSelectable
              ? "bg-primary/10 text-primary"
              : "text-foreground",
          )}
          style={{ paddingLeft: `${depth * 12}px` }}
        >
          <span className="flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            {nodeLabel}
          </span>
          {!isSelectable ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
              {t("appSearch.comingSoon", { ns: "tools" })}
            </span>
          ) : null}
        </button>
      </li>
    );
  };

  return (
    <div className="relative mb-2 min-w-md" ref={rootRef}>
      <div className="flex items-center relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
        <input
          className="bg-surface-container-high border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/40 w-full transition-all outline-none"
          placeholder={t("header.searchPlaceholder", { ns: "tools" })}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setQuery("");
            }
          }}
        />
      </div>

      {isOpen ? (
        <Card className="absolute top-full z-30 w-full border-border/80 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/75">
          <CardHeader className="pb-2">
            <CardTitle>{t("appSearch.title", { ns: "tools" })}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {t("appSearch.currentSelection", {
                ns: "tools",
                selected: selectedFormLabel,
              })}
            </p>
          </CardHeader>
          <CardContent className="max-h-80 pt-0 overflow-y-auto scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filteredTree.length > 0 ? (
              <ul className="space-y-3">
                {filteredTree.map((node) => renderNode(node))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t("appSearch.emptyResult", { ns: "tools" })}
              </p>
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default ToolSearch;
