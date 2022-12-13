/* const [Position, setPosition] = useState({
    Lat: '',
    Lon : ''
})
useEffect(e=> {
    navigator.geolocation.getCurrentPosition(position => {
        setPosition({Lat : position.coords.latitude, Lon: position.coords.longitude})
    })

}, [])


const viewport = {
    latitude: Position.Lat,
    longitude: Position.Lon,
    zoom: 10
}

const mapStyle = {
    width: '100%',
    height: 600
}
const mapboxApiKey = 'pk.eyJ1IjoiYmlsbHl0dXJwaW42NCIsImEiOiJja3lqaXhzczMwdGhqMm5xb2pib3FjYXJjIn0.txnUkvisHn-qpLHgV-Cw1g'


<Map 
mapboxAccessToken={mapboxApiKey}
mapStyle="mapbox://styles/billyturpin64/cl3oj3c2x000b14qv32l9rbed"
{...viewport}
{...mapStyle}
onViewportChange={viewport}
/>
 */