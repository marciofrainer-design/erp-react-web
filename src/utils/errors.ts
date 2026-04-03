export function getErrorMessage(err: unknown): string {
  const toFriendlyNetworkMessage = (message: string) => {
    const normalized = message.toLowerCase();

    if (normalized.includes("timeout")) {
      return "Tempo limite da requisicao excedido. Verifique se o servidor esta ativo.";
    }

    if (normalized.includes("network error") || normalized.includes("err_network")) {
      return "Falha de conexao com o servidor. Verifique sua rede e tente novamente.";
    }

    return message;
  };

  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string" && message.trim().length > 0) {
      return toFriendlyNetworkMessage(message);
    }
  }

  if (err instanceof Error && err.message.trim().length > 0) {
    return toFriendlyNetworkMessage(err.message);
  }

  return "Erro inesperado";
}
