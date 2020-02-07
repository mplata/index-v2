import React,{Component} from 'react';
import { View, Text } from 'react-native';

class ExpoListContainer extends Component{

    render(){
        return <View style={styles.container}>
            <Text>
                Lista de expos
            </Text>
        </View>
    }
}

const styles = {
    container:{
        paddingTop:20
    }
}

export default ExpoListContainer;