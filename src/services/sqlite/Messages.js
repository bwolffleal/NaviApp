import db from './SQLiteDatabase'

const createMessages = (obj) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO messages (newMessageID, newChatParticipants, chatID, text, time) values (?, ?, ?, ?, ?);", [obj.newMessageID, obj.newChatParticipants, obj.chatID, obj.text, obj.time],
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

const updateMessages = (id, obj) => {
    return new Promise ( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("UPDATE messages SET newChatParticipants=?, chatID=?, text=?, time=? WHERE newMessageID=?;", [onj.contactID, obj.chatID, obj.text, obj.time, id],
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

const findMessages = (id) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM messages WHERE chatID=?;", [id],
                    (_, { rows }) => {
                        if(rows.length > 0)
                            resolve(rows._array)
                        else
                            reject('Obj not found: id='+id)
                    },
                    (_,error) => reject(error)
                    )
            }
        )
    })
}

const findParticipants = (id) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT DISTINCT newChatParticipants FROM messages WHERE chatID=?;", [id],
                    (_, { rows }) => {
                        if(rows.length > 0)
                            resolve(rows._array)
                        else
                            reject('Obj not found: id='+id)
                    },
                    (_,error) => reject(error)
                    )
            }
        )
    })
}

const allMessages = () => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM messages;", [],
                (_, { rows }) => resolve(rows._array),
                (_,error) => reject(error)
                )
            }
        )
    })
}

const removeMessages = (id) => {
    return new Promise( (resolve, reject) => {
        
        db.transaction(
            tx => {
                tx.executeSql("DELETE FROM messages WHERE id=?;", [id],
                    (_, {rowsAffected}) => {
                    resolve(rowsAffected)
                    },
                    (_,error) => reject(error)
                )
            }
        )
    })
}

const createTBMessages = () => {
    return (
        db.transaction(tx => {
    
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS messages (newMessageID VARCHAR(255) PRIMARY KEY, newChatParticipants VARCHAR(255), chatID VARCHAR(255), text TEXT, time TEXT);"
            )

        })
    )
}

const deleteAll = () => {
    return (
        db.transaction(tx => {
    
            tx.executeSql(
                "DELETE FROM messages;"
            )

        })
    )
}

export default {
    createMessages,
    updateMessages,
    findMessages,
    findParticipants,
    allMessages,
    removeMessages,
    createTBMessages,
    deleteAll,
}