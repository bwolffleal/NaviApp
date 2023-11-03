import { SQLError } from 'expo-sqlite'
import db from './SQLiteDatabase'

const createContact = (obj) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO contacts (contactID, name, picture) values (?, ?, ?);", [obj.contactID, obj.contactName, obj.contactPicture],
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

const updateContact = (id, obj) => {
    return new Promise ( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("UPDATE contacts SET name=?, picture=? WHERE contactID=?;", [obj.name, obj.picture, id],
                    (_, {rowsAffected}) => {
                        if(rowsAffected > 0)
                            resolve(rowsAffected)
                        else
                            reject('Error updating obj: contactID='+id)

                    },
                    (_,error) => reject(error)
                    )
            }
        )
    })
}

const findContactID = (id) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT name FROM contacts WHERE contactID=?;", [id],
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

const findContactPicture = (id) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT picture FROM contacts WHERE contactID=?;", [id],
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

const findContactName = (contactName) => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM contacts WHERE name LIKE ?;", ['%'+contactName+'%'],
                    (_, { rows }) => {
                        if(rows.length > 0)
                            resolve(rows._array)
                        else
                            reject('Obj not found: name='+contactName)
                    },
                    (_,error) => reject(error)
                    )
            }
        )
    })
}

const allContact = () => {
    return new Promise( (resolve, reject) => {

        db.transaction(
            tx => {
                tx.executeSql("SELECT * FROM contacts;", [],
                (_, { rows }) => resolve(rows._array),
                (_,error) => reject(error)
                )
            }
        )
    })
}

const removeContact = (id) => {
    return new Promise( (resolve, reject) => {
        
        db.transaction(
            tx => {
                tx.executeSql("DELETE FROM contacts WHERE contactID=?;", [id],
                    (_, {rowsAffected}) => {
                    resolve(rowsAffected)
                    },
                    (_,error) => reject(error)
                )
            }
        )
    })
}

const createTBContacts = () => {
    return (
        db.transaction(tx => {
    
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS contacts (contactID VARCHAR(255) PRIMARY KEY, name TEXT, picture TEXT);"
            )

        })
    )
}

const deleteAll = () => {
    return (
        db.transaction(tx => {
    
            tx.executeSql(
                "DROP TABLE contacts;"
            )

        })
    )
}

export default {
    createContact,
    updateContact,
    findContactID,
    findContactPicture,
    findContactName,
    allContact,
    removeContact,
    createTBContacts,
    deleteAll,
}