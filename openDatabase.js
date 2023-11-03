import * as SQLite from 'expo-sqlite';

export default function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("./src/database/database.db");
    return db;
  }
  
//  <FlatList data={ContactsList.allContact} keyExtractor={item => item.contactID} showsVerticalScrollIndicator={false} renderItem={({item})=>(
//    <TouchableOpacity style={styles.contactInfo} onPress={navigateToChat}>
//        <Image source={require("../../assets/SkullPicture.png")} 
//            resizeMode="stretch" 
//            style={styles.image}>
//        </Image>
//        <Text style={styles.contactName}>{item.contactName}</Text>
//    </TouchableOpacity>
//)}/>



//                    <FlatList data={[1, 2, 3, 4, 5, 6, 7]} keyExtractor={contact => String(contact)} showsVerticalScrollIndicator={false} renderItem={()=>(
//                        <TouchableOpacity style={styles.contactInfo} onPress={navigateToChat}>
//                            <Image source={require("../../assets/SkullPicture.png")} 
//                                resizeMode="stretch" 
//                                style={styles.image}>
//                            </Image>
//                            <Text style={styles.contactName}>Ryuji Sakamoto</Text>
//                        </TouchableOpacity>
//                    )}/>