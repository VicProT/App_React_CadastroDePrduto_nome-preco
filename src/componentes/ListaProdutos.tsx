import { FlatList, StyleSheet, View, Text } from 'react-native';
import { ItemProduto } from './ItemProduto';
import { Produto } from '../tipos/types';

type Props = {
  produtos: Produto[];
  onEditar: (produto: Produto) => void;
  onExcluir: (id: number) => void;
};

export const ListaProdutos = ({ produtos, onEditar, onExcluir }: Props) => {
  if (produtos.length === 0) {
    return (
      <View style={styles.semProdutos}>
        <Text>Nenhum produto cadastrado</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ItemProduto
          produto={item}
          onEditar={() => onEditar(item)}
          onExcluir={() => onExcluir(item.id)}
        />
      )}
      contentContainerStyle={styles.lista}
    />
  );
};

const styles = StyleSheet.create({
  lista: {
    padding: 16,
  },
  semProdutos: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});