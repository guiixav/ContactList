import { StatusBar } from 'expo-status-bar';
import { Alert, Text, TextInput, TouchableOpacity,ScrollView, View, Keyboard} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuid } from 'uuid';
import { Ionicons , MaterialCommunityIcons  , AntDesign, MaterialIcons, Entypo   } from '@expo/vector-icons';



import {criaTabelaContatosTelefonicos,adicionaContato,excluiContato, alteraContato, obtemTodosContatos}  from './repository/dbContext';



export default function App() {

  const [id, setId] = useState();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [contatos, setContatos] = useState([]);
  const [criarTabela, setCriarTabela] = useState(false);

  const [recarregaTela, setRecarregaTela] = useState(true);

  const unique_id = uuid();

  async function processamentoUseEffect() {
    if (!criarTabela) {
      console.log("Verificando necessidade de criar tabelas...");
      setCriarTabela(true);
      await criaTabelaContatosTelefonicos();
    }
    if (recarregaTela) {
      console.log("Recarregando dados...");
      await AtualizaTela();
    }
  }


  function limpaCampos() {
    setNome('');
    setTelefone('');
    setId(undefined);
    Keyboard.dismiss();
  }

  async function salvar() {
    let novoRegistro = false;
    let identificador = id;
    if (identificador == undefined) {
      identificador = unique_id;
      novoRegistro = true;
    }
    
    let contato={
      id: identificador,
      nome: nome, 
      telefone: telefone,
    };
    console.log(novoRegistro);
    try{
      if (novoRegistro){
        let response = (await adicionaContato(contato));
        Alert.alert("Registro salvo com sucesso!");
        console.log("Registro salvo com sucesso!")    }
      else{
        let response = await alteraContato(contato);
      }
      setContatos(contatos);
      const jsonValue = JSON.stringify(contatos);
      await AsyncStorage.setItem('@contatos', jsonValue);
      Keyboard.dismiss();
      //Alert.alert('Dados salvos com sucesso!!!');
      limpaCampos();
      Alert.alert("Registro alterado com sucesso!");
      setRecarregaTela(true);
      Keyboard.dismiss();
      limparCampos();
      setRecarregaTela(true);
    }
    catch(erro){
    Alert.alert(erro);
    }
  }

async function AtualizaTela() {
  try {
    let contatos = await obtemTodosContatos();
    setContatos(contatos);
    setRecarregaTela(false);
  } catch (e) {
    Alert.alert(e.toString());
  }
}





function editar(identificador) {
  const contato = contatos.find(contato => contato.id == identificador);

  if (contato != undefined) {
    setId(contato.id);
    setNome(contato.nome);
    setTelefone(contato.telefone);
  }

  console.log(contato);
}

async function removeContato(id) {
  try {
    await excluiContato(id);
    Keyboard.dismiss();
    limparCampos();
    setRecarregaTela(true);
  } catch (e) {
    Alert.alert(e);
  }
}

useEffect(
  () => {      
    AtualizaTela();
    processamentoUseEffect();
  }, [recarregaTela]);


  return (
    <View style={styles.container}>
      <View style={styles.areaTitulo}>
        <Entypo name="old-phone" size={24} color="black" />
        <Text style={styles.tituloProjeto} >Lista Telefônica</Text>
      </View>
      

      <View style={styles.areaDados}>
        <View style={styles.areaNome}>
          <Text style={styles.legendaCadastro}>Nome</Text>
          <TextInput
            style={styles.caixaTexto}
            onChangeText={(texto) => setNome(texto)}
            value={nome}                   
          />

        </View>
        <View style={styles.areaTelefone}>
          <Text style={styles.legendaCadastro}>Telefone</Text>
          <TextInput
            style={styles.caixaTexto}
            onChangeText={(texto) => setTelefone(texto)}
            value={telefone}                   
          />

        </View>
      </View>
      <View style={styles.areaBotoes}>
        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={() => salvar()}
        >
          <Ionicons name="ios-add-circle" size={32} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCancelar}
            onPress={()=> limpaCampos()}>
          <MaterialCommunityIcons name="cancel" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaContatos}>
        {
          contatos.map((contato, index) => (
            <View style={styles.contato} key={index.toString()}>

              <View style={styles.dadosListaNome}>
              <MaterialIcons name="contacts" size={24} color="darkgray" />
                <Text style={styles.listaNome}> {contato.nome}</Text>
              </View>
              <View style={styles.dadosListaTelefone}>
              <MaterialCommunityIcons name="cellphone-android" size={24} color="darkgray" />
                <Text style={styles.listaTelefone} >{contato.telefone} </Text>
              </View>

              <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removeContato(contato.id)}>
                <AntDesign name="deleteuser" size={24} color="darkgray" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(contato.id)}>                 
                <MaterialCommunityIcons name="account-edit" size={24} color="darkgray" />
                </TouchableOpacity>

              </View>
            </View>
          ))
        }

      </ScrollView>

  
      <StatusBar style="auto" />
    </View >
  );
}


