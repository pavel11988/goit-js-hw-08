import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const options = {
    id: 59777392,
    width: 640,
    loop: true
};
const player = new Player('made-in-ny', options);
player.setVolume(0);

const onTime = function(data) {
   console.log(data.seconds);
   localStorage.setItem("videoplayer-current-time",data.seconds)
};

player.setCurrentTime(localStorage.getItem("videoplayer-current-time")).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});

player.on('timeupdate', throttle(onTime, 1000));
 