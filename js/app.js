(function(){
  var app = angular.module('timetracker', ['timeFilter']);

  app.controller('TrackingController', function($scope){
    $scope.tasks = tasks;
    $scope.newTask = {};
    $scope.currentTask = {};

    $scope.setCurrentTask = function(task) {
      //Add new task
      $scope.tasks.push(task);
      //Set CurrentTask
      $scope.currentTask = $scope.newTask;
      //Clear new task
      $scope.newTask = {};
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
