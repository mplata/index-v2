import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const RoundedButton = (props) =>{

    let onClick = props.onClick;
    let text = props.text;
    let style = {};
    if(props.width){
        style = [styles.container,{width:props.width}];
    }else{
        style = styles.container;
    }
    return <TouchableOpacity style={style} onPress={onClick}>
        <Text style={styles.text}>
            {text}
        </Text>
    </TouchableOpacity>
};

const styles = {
    container:{
        borderColor:'white',
        borderRadius:20,
        margin:10,
        paddingBottom:3,
        paddingTop:3,
        paddingRight:10,
        paddingLeft:10,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:'white',
        fontSize:16,
        fontWeight:'bold',
        fontFamily: 'Avenir'
    }
}

export default RoundedButton;