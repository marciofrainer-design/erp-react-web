const ptBRCrud = {
  title: "Operacoes de CRUD",
  actions: {
    search: "Pesquisar...",
    searchPlaceholder: "Termo da pesquisa radical",
    close: "Fechar",
    save: "Salvar",
    cancel: "Cancelar",
    new: "Novo",
    view: "Visualizar",
    delete: "Excluir",
    clone: "Clonar",
    print: "Imprimir",
  },
  status: {
    connected: "Conectado",
    disconnected: "Sem conexão",
  },
  notifications: {
    empty: "Nenhuma notificação",
    dismiss: "Dispensar notificação",
    loadingDataError: "Erro ao carregar dados",
    savingSuccess: "Registro salvo com sucesso.",
    savingError: "Não foi possível salvar o registro.",
    invalidRepositoryConfig:
      "Configuração de repositório inválida para exclusão.",
    invalidPrimaryKey:
      "Não foi possível identificar o registro para exclusão. Chave primária ausente ou inválida.",
    missingPrimaryKeyValue:
      "Valor da chave primária não encontrado no item selecionado.",
    deleteCancelled: "Exclusão cancelada pelo usuário.",
    deleteSuccess: "Registro excluído com sucesso.",
    deleteError: "Não foi possível excluir o registro.",
    printReport: "Imprimir relatório",
    formValid: "O formulário está válido.",
    formInvalid: "Existem erros no formulário. Revise os campos obrigatórios.",
    loadingData: "Carregando dados",
    preparingData: "Estamos preparando os dados para você continuar.",
  },
  confirmations: {
    delete: "Tem certeza de que deseja excluir este registro?",
    deleteTitle: "Confirmar exclusão",
    deleteDescription:
      "Essa ação removerá o registro selecionado de forma permanente.",
    deleteConfirmText: "Excluir registro",
    deleteCancelText: "Cancelar",
    save: "Tem certeza de que deseja salvar as alterações?",
    saveTitle: "Confirmar salvamento",
    saveDescription: "Essa ação salvará as alterações feitas no registro.",
    saveConfirmText: "Salvar alterações",
    saveCancelText: "Continuar editando",
    cancel:
      "Tem certeza de que deseja cancelar? As alterações não salvas serão perdidas.",
    cancelTitle: "Confirmar cancelamento",
    cancelDescription: "Essa ação cancelará as alterações feitas no registro.",
    cancelConfirmText: "Cancelar alterações",
    cancelCancelText: "Continuar editando",
  },
  table: {
    displaying: "Exibindo {{visibleRows}} de {{totalRows}} registros",
    previous: "Anterior",
    next: "Próximo",
  }
} as const;

export default ptBRCrud;
