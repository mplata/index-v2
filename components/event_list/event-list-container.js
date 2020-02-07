import React,{Component} from 'react';
import {ScrollView, View, Image} from 'react-native';
import firebase from '../../firebase';
import EventContainer from '../event/event-container';
import Separator from '../separator/separator';

class EventListContainer extends Component{

    state = {
        events:[],
        loadingEvents:true,
        images:[]
    };

    componentDidMount(){
        let db = firebase.firestore();
        var eventsRef = db.collection("events");
        eventsRef.where("active",'==',true).get().then(querySnapshot =>{
            let events = [];
            let eventImages = [];
            querySnapshot.forEach(function(doc) {
                let data = {...doc.data()};
                data.id = doc.id;
                events.push(data);
                eventImages.push(data.images[0]);
            });
            this.setState({events:events, loadingEvents:false});
        })
    }

    openDetail = (event) =>{
        this.props.navigation.navigate('detail',event);
    }

    render(){
        let events = this.state.events;
        let eventsViews = events.map(evt =>{
            return <View key={evt.id}>
                    <EventContainer event={evt} openDetail={this.openDetail}/>
                    <Separator/>
                </View>;
        });
        return <View style={styles.root}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.inner}>
                {eventsViews}
            </ScrollView>
            <Image
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
            />
        </View>
    }
}

const styles = {
    root: {
        height:'100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop:0
    },
    scroll:{
        flex:1,
        backgroundColor:'white'
    },
    inner:{
        
    },
    logo:{
        width:30,
        height:30,
        position:'absolute',
        top:25,
        left:5
    }
}

export default EventListContainer;