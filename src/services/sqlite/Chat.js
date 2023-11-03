import db from './SQLiteDatabase'

const createChat = (obj) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO chat (chatID, chatName, chatPicture) values (?, ?, ?);", [obj.chatID, obj.chatName, obj.chatPicture],
                    (_, {rowsAffected, insertId}) => {
                        if(rowsAffected > 0)
                            resolve(insertId)
                        else
                            reject('Error inserting obj: '+JSON.stringify(obj))
                    },
                    (_,error) => reject(error)
                    )
            }
        )
    })
}

const updateChat = (id, obj) => {
    return new Promise ( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("UPDATE chat SET chatName=? WHERE id=?;", [obj.chatName, id],
                    (_, {rowsAffected}) => {
                        if(rowsAffected > 0)
                            resolve(rowsAffected)
                        else
                            reject('Error updating obj: id='+id)

                    },
                    (_,error) => reject(error)
                    )
            }
        )
    })
}

const findChat = (id) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM chat WHERE id=?;", [id],
                    (_, { rows }) => {
                        if(rows.length > 0)
                            resolve(rows._array[0])
                        else
                            reject('Obj not found: id='+id)
                    },
                    (_,error) => reject(error)
                    )
            }
        )
    })
}

const findChatName = (chatName) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM chat WHERE chatName LIKE ?;", ['%'+chatName+'%'],
                    (_, { rows }) => {
                        if(rows.length > 0)
                            resolve(rows._array)
                        else
                            reject('Obj not found: chatName='+chatName)
                    },
                    (_,error) => reject(error)
                    )
            }
        )
    })
}

const allChat = () => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM chat;", [],
                (_, { rows }) => resolve(rows._array),
                (_,error) => reject(error)
                )
            }
        )
    })
}

const removeChat = (id) => {
    return new Promise( (resolve, reject) => {
        
        db.transaction(
            tx => {
                tx.executeSql("DELETE FROM chat WHERE id=?;", [id],
                    (_, {rowsAffected}) => {
                    resolve(rowsAffected)
                    },
                    (_,error) => reject(error)
                )
            }
        )
    })
}

const createTBChat = () => {
    return (
        db.transaction(tx => {
    
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS chat (chatID VARCHAR(255) PRIMARY KEY, chatName TEXT, chatPicture TEXT);"
            )

        })
    )
}

const deleteAll = () => {
    return (
        db.transaction(tx => {
    
            tx.executeSql(
                "DELETE FROM chat;"
            )

        })
    )
}

export default {
    createChat,
    updateChat,
    findChat,
    findChatName,
    allChat,
    removeChat,
    createTBChat,
    deleteAll,
}