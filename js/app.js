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
      $scope.$broadcast ('startStopwatch');
    };
  });

  app.controller('StopwatchCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.running = false;

    $scope.$on('startStopwatch', function(e) {
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



  var tasks = [
    {
      name: 'Coding',
      measurements:[
        {
          time_elapsed: 534432
        },
        {
          time_elapsed: 454432
        }
      ]
    },
    {
      name: 'Marketing',
      measurements:[
        {
          time_elapsed: 439284
        },
        {
          time_elapsed: 19834
        }
      ]
    }
  ];

})();
