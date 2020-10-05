import React, {Component} from 'react'
import { Map, TileLayer } from 'react-leaflet'

class SimpleMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: props.race.Circuit.Location,
            viewport: props.Viewport
        }
    }

    render() { 
        const raceTrack = [this.state.location.lat, this.state.location.long]
        return (
            <Map 
                center={raceTrack}
                zoom={15}
                style={{ width: '100%', height: '900px'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            </Map>
        )
    }
}

export default SimpleMap