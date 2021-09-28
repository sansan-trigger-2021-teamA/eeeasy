import Geolocation from '@react-native-community/geolocation';

console.log(Geolocation.getCurrentPosition(
    (position) => console.log(position),
    (err) => console.log(err),
))