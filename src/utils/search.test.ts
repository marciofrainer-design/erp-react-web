import { normalizeSearchText, stringifyForSearch } from "./search";

describe("normalizeSearchText", () => {
  it("remove acentos e converte para minusculas", () => {
    expect(normalizeSearchText("ÁRVORE ÇÃO")).toBe("arvore cao");
  });

  it("mantem numeros e simbolos relevantes", () => {
    expect(normalizeSearchText("Apto 101 - Bloco B")).toBe("apto 101 - bloco b");
  });
});

describe("stringifyForSearch", () => {
  it("retorna string vazia para null e undefined", () => {
    expect(stringifyForSearch(null)).toBe("");
    expect(stringifyForSearch(undefined)).toBe("");
  });

  it("serializa arrays e objetos aninhados", () => {
    const payload = {
      codigo: 10,
      nome: "Apartamento",
      tags: ["Luxo", "Frente Mar"],
      meta: { ativo: true, andar: 3 },
    };

    expect(stringifyForSearch(payload)).toBe(
      "10 Apartamento Luxo Frente Mar true 3",
    );
  });

  it("converte primitivos para string", () => {
    expect(stringifyForSearch(42)).toBe("42");
    expect(stringifyForSearch(false)).toBe("false");
  });
});
