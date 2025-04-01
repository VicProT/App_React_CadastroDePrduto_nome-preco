import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Produto } from '../tipos/types';

type Props = {
  produto: Produto;
  onEditar: () => void;
  onExcluir: () => void;
};

export const ItemProduto = ({ produto, onEditar, onExcluir }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
      </View>
      
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoEditar} onPress={onEditar}>
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.botaoExcluir} onPress={onExcluir}>
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  preco: {
    fontSize: 14,
    color: '#666',
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoEditar: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  botaoExcluir: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 4,
  },
  textoBotao: {
    color: 'white',
    fontSize: 12,
  },
});