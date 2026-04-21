import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TableBase } from "./TableBase";
import { FieldType } from "@/types";

type TestRow = {
  id: number;
  isprincipal: number;
  ativo: number;
  nome: string;
};

describe("TableBase", () => {
  it("usa onCellChange da tabela quando a coluna checkbox nao define onChange", () => {
    const handleCellChange = vi.fn();

    render(
      <TableBase<TestRow>
        columns={[
          {
            label: "Principal",
            field: "isprincipal",
            checkbox: {
              checkedValue: 1,
              uncheckedValue: 0,
              isChecked: (value) => value === 1,
            },
          },
        ]}
        data={[{ id: 1, isprincipal: 0, ativo: 1, nome: "Suite" }]}
        onCellChange={handleCellChange}
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Alternar isprincipal" });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(handleCellChange).toHaveBeenCalledWith(
      { id: 1, isprincipal: 0, ativo: 1, nome: "Suite" },
      0,
      "isprincipal",
      1,
    );
  });

  it("renderiza checkbox configurado e envia os valores checked e unchecked com onChange da coluna", () => {
    const handleChange = vi.fn();

    render(
      <TableBase<TestRow>
        columns={[
          {
            label: "Principal",
            field: "isprincipal",
            checkbox: {
              checkedValue: 1,
              uncheckedValue: 0,
              isChecked: (value) => value === 1,
              onChange: handleChange,
            },
          },
        ]}
        data={[{ id: 1, isprincipal: 0, ativo: 1, nome: "Suite" }]}
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Alternar isprincipal" });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(
      { id: 1, isprincipal: 0, ativo: 1, nome: "Suite" },
      1,
      0,
    );
  });

  it("nao dispara onRowClick ao clicar no checkbox configurado e preserva boolean padrao", () => {
    const handleChange = vi.fn();
    const handleRowClick = vi.fn();

    render(
      <TableBase<TestRow>
        columns={[
          {
            label: "Principal",
            field: "isprincipal",
            checkbox: {
              checkedValue: 1,
              uncheckedValue: 0,
              isChecked: (value) => value === 1,
              onChange: handleChange,
            },
          },
          {
            label: "Ativo",
            field: "ativo",
            type: FieldType.BOOLEAN,
          },
        ]}
        data={[{ id: 1, isprincipal: 1, ativo: 1, nome: "Suite" }]}
        onRowClick={handleRowClick}
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Alternar isprincipal" });
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(
      { id: 1, isprincipal: 1, ativo: 1, nome: "Suite" },
      0,
      0,
    );
    expect(handleRowClick).not.toHaveBeenCalled();
    expect(screen.getAllByRole("row")).toHaveLength(2);
  });
});