(function(){
  var app = angular.module('timetracker', ['timeFilter', 'LocalStorageModule', 'ui.router']);

  app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/tracking');

    $stateProvider
        .state('tracking', {
            url: '/tracking',
            templateUrl: 'partials/partial-tracking.html',
            controller: 'TrackingController'
        })

        .state('reporting', {
            url: '/reporting',
            templateUrl: 'partials/partial-reporting.html'
        });

  });


  app.controller('TrackingController', function($scope, persistService){

    $scope.newTask = { measurements: []};

    //retrieve tasks
    if( persistService.getTasks() !== null ){
      $scope.tasks = persistService.getTasks();
    }else{
      $scope.tasks = [];
    }

    //Persist Tasks
    $scope.$on('tracking:persist', function(e) {
      console.log('Saving changes...');
      persistService.saveTasks($scope.tasks);
    });

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

    $scope.totalTime = function (task) {
      var total_time = _.reduce(task.measurements, function(memo, num){ return memo + num.time_elapsed; }, 0);

      return total_time;
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
      $scope.$emit ('tracking:persist');
    };

    $scope.stop = function() {
      $scope.running = false;
      $timeout.cancel($scope.timeout);
      $scope.currentMeasurement.end_date = new Date().getTime();
      $scope.$emit ('tracking:persist');
    };
  }]);

  app.controller('ReportingController', function($scope, persistService){
    //retrieve tasks
    if( persistService.getTasks() !== null ){
      $scope.tasks = persistService.getTasks();
    }else{
      $scope.tasks = [];
    }

  });

  app.service('persistService', function(localStorageService) {
      this.clearTasks = function(){
        localStorageService.clearAll();
      }
      this.saveTasks = function(tasks) {
        localStorageService.add('timetrackerTasks', tasks);
      };

      this.getTasks = function() {
        return (localStorageService.get('timetrackerTasks'));
      };
  });

})();
