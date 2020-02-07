import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';

const Separator = () =>{
    return <LinearGradient 
            colors={['#DBFF00','#3EE6C1', '#DBFF00']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={style}/>;
};

const style = {
    width:'100%',
    height:10
}
export default Separator;