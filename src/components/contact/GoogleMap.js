import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
export let latlon = {}

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter: {
                lat:-31.40916165247079,
                lng: -64.19570257354319
            },
            containerStyle: {
                display: 'flex', 
                width: '400px',
                height: '250px',
              }
        };
      }
  
    handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
            this.setState({ address })
            this.setState({ mapCenter: latLng})
            latlon = latLng
          })
          .catch(error => console.error('Error', error));
      };
      
  
    render() {
      return (
          <div className='mapa'>
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                    {...getInputProps({
                        placeholder: 'Dirección',
                        className: 'form-control input-map mapa',
                    })}
                    />
                    <div className="">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>
                    
            <Map
                google={this.props.google}
                initialCenter={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
                containerStyle={this.state.containerStyle}
                center={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
            >
            <Marker  
                position={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
            />
            </Map>
          </div>
       
      )
    }
  }

  export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_CLAVE_API_GOOGLE_MAPS)
  })(MapContainer)