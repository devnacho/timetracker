(function(){
  var app = angular.module('timetracker', ['timeFilter']);

  app.controller('RecentTasksController', function(){
    this.tasks = tasks;
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
