angular.module('timeFilter', []).filter('duration', function() {
  return function(duration) {
    if(duration == null){
        return ""
    }
    var seconds = parseInt((duration)%60)
        , minutes = parseInt((duration/(60))%60)
        , hours = parseInt((duration/(60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };
});