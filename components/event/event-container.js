import React,{Component} from 'react';
import {ImageBackground, Text, ActivityIndicator, View} from 'react-native';
import { loadImage } from '../../services/firebase-services';
import RoundedButton from '../inputs/RoundedButton';

class EventContainer extends Component{

    state = {
        loading:true,
        images:[]
    }

    componentWillMount(){

        let evtImages = this.props.event.images;
        let urisPromises = evtImages.map(img =>{
            return loadImage('events',img);
        });
        Promise.all(urisPromises).then(uris =>{
            this.setState({images:uris,loading:false});
        });
    }

    openDetail = () =>{
        let evt = this.props.event;
        this.props.openDetail(evt)
    }

    render(){

        if(this.state.loading){
            return <ActivityIndicator color='black' size='large'/>
        }
        let evt = this.props.event;
        let images = this.state.images;
        let date = evt.date.toDate();
        return <ImageBackground imageStyle={{resizeMode: 'stretch',height: '100%'}} 
                        source={{uri: images[0]}}
                        style={styles.container}>
                    <View style={styles.inner}>
                        <View style={styles.overlay}/>
                        <Text style={styles.text_name}>{evt.name}</Text>
                        <Text style={styles.text_place}>{evt.place}</Text>
                        <Text style={styles.text_date}>{date.toLocaleDateString()}</Text>
                        <RoundedButton text='+ Información' onClick={this.openDetail}/>
                    </View>
                </ImageBackground>
    }

};

const styles = {
    inner:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    overlay:{
        position:'absolute',
        top:0,
        left:0,
        backgroundColor:'black',
        opacity:0.3,
        width:'100%',
        height:'100%'
    },
    container:{
        width:'100%',
        height: 400
    },
    text_name:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
        fontFamily: 'Avenir'
    },
    text_place:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        fontFamily: 'Avenir'
    },
    text_date:{
        color:'white',
        fontSize:16,
        fontWeight:'bold',
        fontFamily: 'Avenir'
    }
}
export default EventContainer;