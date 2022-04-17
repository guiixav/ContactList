import * as SQLite from 'expo-sqlite';

export function getDbConection(){
  const db = SQLite.openDatabase('dbContatosTelefonicos.db');
  return db;
}

export async function criaTabelaContatosTelefonicos(){
  const db = getDbConection();
  await db.transaction(tx => {
    tx.executeSql(
      'create table if not exists contatos (id text primary key not null, nome text, telefone text);'
    );
  });
  console.log("tabela criada");
}

export function adicionaContato(contato) {
    console.log('Adicionando contato ' + contato.nome);
    return new Promise((resolve, reject) => {
        let query = 'insert into contatos (id, nome, telefone) values (?,?,?)';
        let dbCx = getDbConection();
        dbCx.transaction(tx => {
        tx.executeSql(query, [contato.id, contato.nome, contato.telefone],
            (tx, resultado) => {
            resolve(resultado.rowsAffected > 0);
            })
        },
        error => {
            console.log(error);
            resolve(false);
        }
        )
    }
    );
}


export function excluiContato(id) {
    console.log('Excluindo contato ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from contatos where id=?';
        let dbCx = getDbConection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function alteraContato(contato) {
    console.log('Alterando contato ' + contato.nome);
    return new Promise((resolve, reject) => {
        let query = 'update contatos set nome=?, telefone=? where id=?';
        let dbCx = getDbConection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [contato.nome, contato.telefone, contato.id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function obtemTodosContatos() {
    return new Promise((resolve, reject) => {
        let query = 'select * from contatos';
        let dbCx = getDbConection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => {
                    let contatos = [];
                    for (let i = 0; i < resultado.rows.length; i++) {
                        contatos.push(resultado.rows.item(i));
                    }
                    resolve(contatos);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}