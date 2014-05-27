(function(){
  var app = angular.module('timetracker', ['timeFilter']);

  app.controller('TrackingController', function($scope){
    $scope.tasks = tasks;
    $scope.newTask = { measurements: []};
    $scope.currentTask = {};

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
      $scope.currentMeasurement = {time_elapsed: 0}
      $scope.currentTask.measurements.push($scope.currentMeasurement);
    };
  });


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
