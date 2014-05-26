(function(){
  var app = angular.module('timetracker', ['timeFilter']);

  app.controller('TrackingController', function(){
    this.tasks = tasks;
  });

  app.controller('RecentTasksController', function(){

  });

  app.controller('NewMeasurementController', function(){
    this.newTask = {};

    this.addTask = function(tasks) {
      tasks.push(this.newTask);
      this.newTask = {};
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
