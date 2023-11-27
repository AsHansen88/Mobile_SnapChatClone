import react from "react";
import {Text, View, Button} from 'react-native'

const onLogout = () => {
        firebase.auth().signOut()
    }

const StoriesScreen = () => {

    return(
        <View style= {{flex: 1, justifyContent: "center",
            alignItems: "center",
            backgroundColor: "blue"}}>
            <Text>Story Screen</Text>
        </View>
    )
}

<Button name="Logout"
onPress={() => onLogout()}
    />


export default StoriesScreen