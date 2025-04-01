export type Produto = {
    id: number;
    nome: string;
    preco: number;
  };
  
  export type ModalProdutoProps = {
    visivel: boolean;
    produto?: Produto | null;
    onCancelar: () => void;
    onSalvar: (produto: Omit<Produto, 'id'>) => void;
  };