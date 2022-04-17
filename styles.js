import { StyleSheet } from 'react-native';
import {Input} from 'react-native-input-style';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `#d3d3d3`,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    tituloProjeto:
    {
        width: '80%',
        fontSize: 25,
        marginBottom : 30,
        textAlign: 'justify',
    },

    areaDados: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },

    areaTitulo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        borderColor: '#fff',
    },

    areaNome: {
        width: '55%',
    },
    areaTelefone: {
        width: '30%',
    },
    
    //////////////////
    caixaTexto: {
        borderColor: "darkgrey",
        borderWidth: 2,
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    botao: {
        width: '30%',
        height: 50,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#040d59',
    },


    botaoApagarTudo: {
        backgroundColor: 'red',
    },
    areaDados: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    areaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 30,
    },
    textoBotao: {
        color: '#FFF',
    },
    areaNome: {
        width: '55%',
    },
    areaTelefone: {
        width: '30%',
    },

    listaContatos: {
        width: '80%',
        height: '80%',
        backgroundColor: '#d3d3d3',
        marginTop: 30,
    },
    contato: {
        backgroundColor: '#778899',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        margin: 10,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 2.22,
        elevation: 3,
    },
    listaNome: {
        width: '50%',
        fontSize: 18,
        paddingRight: 10,
        color:'#f0fff0',
    },

    dadosListaTelefone: {
        width: '30%',
        flexDirection: 'row',
        
    },
    dadosListaNome: {
        width: '60%',
        flexDirection: 'row',
        
    },
    dadosBotoesAcao: {
        width: '10%',
    },
    iconTelefone: {
        width: 20,
        height: 25,
        marginRight: 5,
    },
    listaTelefone: {
        fontSize: 18,
        color:'#f0fff0',

    },


 
});

export default styles;