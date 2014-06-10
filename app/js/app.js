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
        })

        .state('timesheet', {
            url: '/timesheet',
            templateUrl: 'partials/partial-timesheet.html',
            controller: 'TimesheetController'
        });

  });


  app.controller('TrackingController', function($scope, persistService, reportService){

    $scope.newTask = { measurements: []};
    //retrieve tasks

    if( persistService.getTasks() !== null ){
      $scope.tasks = persistService.getTasks();
    }else{
      $scope.tasks = [];
    }

    //Persist Tasks
    $scope.$on('tracking:persist', function(e) {
      console.log('Saving changes...' + $scope.tasks);
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
      //First stop current task and save its state
      $scope.$broadcast ('stopwatch:stop');
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

    $scope.totalTimeToday = function (task) {
      return reportService.totalTimeToday(task);
    };

  });

  app.controller('StopwatchCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.running = false;

    $scope.$on('stopwatch:start', function(e) {
      $scope.start();
    });

    $scope.$on('stopwatch:stop', function(e) {
      $scope.stop();
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

  app.controller('ReportingController', function($scope, persistService, reportService){
    //retrieve tasks
    if( persistService.getTasks() !== null ){
      $scope.tasks = persistService.getTasks();
    }else{
      $scope.tasks = [];
    }

    $scope.totalTime = function (task) {
      return reportService.totalTime(task);
    };

    $scope.totalTimeToday = function (task) {
      return reportService.totalTimeToday(task);
    };

  });

  app.controller('TimesheetController', function($scope, persistService, reportService){
    //retrieve tasks
    if( persistService.getTasks() !== null ){
      $scope.tasks = persistService.getTasks();
      $scope.currentTask = _.first($scope.tasks);
    }else{
      $scope.tasks = [];
      $scope.currentTask = {};
    }

    $scope.setCurrentTask = function(task) {
      $scope.currentTask = task;
    };

    $scope.totalTime = function (task) {
      return reportService.totalTime(task);
    };

    $scope.totalTimeToday = function (task) {
      return reportService.totalTimeToday(task);
    };

  });

  app.service('reportService', function() {
    this.totalTimeToday = function (task) {
      var today =  new Date();
      today.setHours(0,0,0,0);
      //Rejects dates before today's midnight
      var today_measurements = _.reject(task.measurements, function(measurement){ return measurement.start_date <= today; });
      var total_time_today = _.reduce(today_measurements, function(memo, num){ return memo + num.time_elapsed; }, 0);

      return total_time_today;
    };

    this.totalTime = function (task) {
      var total_time = _.reduce(task.measurements, function(memo, num){ return memo + num.time_elapsed; }, 0);

      return total_time;
    };
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
