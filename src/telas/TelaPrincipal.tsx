import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { ListaProdutos } from '../componentes/ListaProdutos';
import { ModalProduto } from './ModalProduto';
import { initDatabase, produtoService } from '../banco/database';
import { Produto } from '../tipos/types';

export const TelaPrincipal = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  useEffect(() => {
    initDatabase();
    carregarProdutos();
  }, []);

  const carregarProdutos = () => {
    setProdutos(produtoService.getAll());
  };

  const handleAdicionar = () => {
    setProdutoEditando(null);
    setModalVisivel(true);
  };

  const handleEditar = (produto: Produto) => {
    setProdutoEditando(produto);
    setModalVisivel(true);
  };

  const handleExcluir = (id: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            if (produtoService.delete(id)) {
              carregarProdutos();
            }
          },
        },
      ]
    );
  };

  const handleSalvar = (novoProduto: Omit<Produto, 'id'>) => {
    if (produtoEditando) {
      if (produtoService.update(produtoEditando.id, novoProduto.nome, novoProduto.preco)) {
        carregarProdutos();
      }
    } else {
      if (produtoService.create(novoProduto.nome, novoProduto.preco)) {
        carregarProdutos();
      }
    }
    setModalVisivel(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoAdicionar} onPress={handleAdicionar}>
        <Text style={styles.textoBotao}>Adicionar Produto</Text>
      </TouchableOpacity>

      <ListaProdutos
        produtos={produtos}
        onEditar={handleEditar}
        onExcluir={handleExcluir}
      />

      <ModalProduto
        visivel={modalVisivel}
        produto={produtoEditando}
        onCancelar={() => setModalVisivel(false)}
        onSalvar={handleSalvar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  botaoAdicionar: {
    backgroundColor: '#2196F3',
    padding: 15,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
});