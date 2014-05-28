(function(){
  var app = angular.module('timetracker', ['timeFilter']);

  app.controller('TrackingController', function($scope){
    $scope.tasks = tasks;
    $scope.newTask = { measurements: []};


    $scope.setCurrentTask = function(task) {
      //Check task existence & add it only if it doesn't exists
      var addToArray=true;
      for(var i=0; i < $scope.tasks.length; i++){
          if ($scope.tasks[i].name === task.name) {
              task = $scope.tasks[i];
              addToArray = false;
              break;
          }
      }
      if (addToArray === true){
        $scope.tasks.push(task);
      }
      //Set CurrentTask
      $scope.currentTask = task;
      //Clear newTask
      $scope.newTask = { measurements: []};
      //Create & Add new measurement
      $scope.currentMeasurement = {time_elapsed: 0, start_date: new Date().getTime()}
      $scope.currentTask.measurements.push($scope.currentMeasurement);
      //Start Stopwatch
      $scope.$broadcast ('stopwatch:start');
    };
  });

  app.controller('StopwatchCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.running = false;

    $scope.$on('stopwatch:start', function(e) {
      //First stop the current and start again
      $scope.stop();
      $scope.start();
    });

    function countdown() {
      $scope.currentMeasurement.time_elapsed++;
      $scope.timeout = $timeout(countdown, 1000);
    }

    $scope.start = function() {
      $scope.running = true;
      countdown();
    };

    $scope.stop = function() {
      $scope.running = false;
      $timeout.cancel($scope.timeout);
      $scope.currentMeasurement.end_date = new Date().getTime();
    };
  }]);



  var tasks = [];

})();
