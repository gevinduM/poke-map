import React from 'react';
import {View, Text, Image ,StyleSheet,Dimensions} from 'react-native';
import {Header,Left,Button,Icon,Body,Title,Right,Fab} from 'native-base';
import MapView from 'react-native-maps';
import Meteor, {withTracker}  from '@xvonabur/react-native-meteor';
import { Mongo } from '@xvonabur/react-native-meteor';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var mapStyle = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c1fcb8"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -31
            },
            {
                "lightness": -33
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.8
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "color": "#e0ffd3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#1dae90"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "-20"
            },
            {
                "saturation": "-67"
            },
            {
                "gamma": "1.32"
            },
            {
                "color": "#57aa9f"
            },
            {
                "weight": "2.00"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "2.00"
            },
            {
                "color": "#b0d9a1"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            },
            {
                "weight": "1.00"
            },
            {
                "color": "#f1ff8a"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "weight": "2.12"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b0d9a1"
            },
            {
                "weight": "2.63"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f1ff8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            },
            {
                "color": "#5ddad6"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#1b87da"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];


class PokeMap extends React.Component{

  
    state = {

        location:{
            latitude:37.78825,
            latitudeDelta: 0.0922,
            longitude: -122.4324,
            longitudeDelta:0.0421
        }
    }

    recordEvent = (x) => {
        //console.log(x);
        this.setState({location:x});
    }

    addPokemon = () =>{
        //console.log('add pokemon  ',this.state.location);
        Meteor.call('pokmon.add', this.state.location, (err,res) =>{
            console.log('add function', err,res);
        });
    }

    removePokemon = ()=>{
        console.log("oki");
		if(this.props.pokemon.length === 0){
			return;
		}
		var remove = this.props.pokemon[0]._id;
		Meteor.call("pokemon.subtract", remove, (err,res)=>{
			console.log('remove function',err,res);
		})
	}

    logOut = () =>{

        Meteor.logout();
        this.props.flipLogin(false);
    }
    renderPokemon = () => {
       // console.log('pokemoon  ',this.props.pokemon);
       if(this.props.pokemonReady){
            return this.props.pokemon.map(p=>{
                return(
                    <MapView.Marker
                            coordinate= {{latitude: p.latitude, longitude: p.longitude}}
                            key={p._id}
                    >
                        <Image source={{uri:"http://192.168.0.28:3000/"+ p.image}}
                                style={{height:50, width:50}}/>
                    </MapView.Marker>
                )
            })
       }
    }

    render(){
        
        return(
            <View style={{flex:1}}>
                <Header style={{width:width}}>
                    <Left>

                    </Left>
                    <Body>
                        <Title>PokeMap</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.logOut}>
                            <Icon name='power'/>
                        </Button>
                    </Right>
                </Header>
                <MapView 
                    style={{flex:1}}
                    initialRegion={this.state.location}
                    provider = {MapView.PROVIDER_GOOGLE}
                    customMapStyle={mapStyle}
                    onRegionChangeComplete = {(x) => this.recordEvent(x)}
                    >
                    
                        {this.renderPokemon()}
                </MapView>
                <Fab
                    direction="left"
                    position="bottomRight"
                    style={{backgroundColor:"green"}}
                    onPress = {this.addPokemon}
                >
                    <Icon name="add"/>
                </Fab>
                <Fab
                    direction="right"
                    position="bottomLeft"
                    style={{backgroundColor:"red"}}
                    onPress={this.removePokemon}
                >
                    <Icon name="remove"/>
                </Fab>
            </View>
        );
    }
}

const styles = StyleSheet.create({
 
});

export default withTracker(params =>{

    Meteor.subscribe('pokemon');
    var pokemon_db = new Mongo.Collection("pokemon")

    return{
       
        pokemonReady: Meteor.subscribe('pokemon').ready(),
        pokemon: pokemon_db.find({"username": Meteor.userId()}),
        
    };

})(PokeMap);