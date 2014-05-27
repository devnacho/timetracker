(function(){
  var app = angular.module('timetracker', ['timeFilter']);

  app.controller('TrackingController', function(){
    this.tasks = tasks;
    this.newTask = {};
    this.currentTask = {};

    this.setCurrentTask = function(task) {
      //Add new task
      this.tasks.push(task);
      //Set CurrentTask
      this.currentTask = this.newTask;
      //Clear new task
      this.newTask = {};
    };

  });


  app.controller('NewMeasurementController', function(){
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
