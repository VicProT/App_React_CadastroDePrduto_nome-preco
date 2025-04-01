import { useState, useEffect } from 'react';
import { View, Modal, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ModalProdutoProps } from '../tipos/types';

export const ModalProduto = ({ visivel, produto, onCancelar, onSalvar }: ModalProdutoProps) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setPreco(produto.preco.toString());
    } else {
      setNome('');
      setPreco('');
    }
  }, [produto]);

  const handleSalvar = () => {
    const precoNumerico = parseFloat(preco);
    if (!nome || isNaN(precoNumerico)) {
      alert('Preencha todos os campos corretamente');
      return;
    }
    onSalvar({ nome, preco: precoNumerico });
  };

  return (
    <Modal visible={visivel} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.titulo}>
            {produto ? 'Editar Produto' : 'Novo Produto'}
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            value={nome}
            onChangeText={setNome}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Preço"
            keyboardType="numeric"
            value={preco}
            onChangeText={setPreco}
          />
          
          <View style={styles.botoesContainer}>
            <TouchableOpacity style={styles.botaoCancelar} onPress={onCancelar}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
              <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoCancelar: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  botaoSalvar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  textoBotao: {
    color: 'white',
    textAlign: 'center',
  },
});