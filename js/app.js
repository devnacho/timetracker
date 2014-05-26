(function(){
  var app = angular.module('timetracker', []);

  app.controller('RecentTasksController', function(){
    this.tasks = tasks;
  });

  var tasks = [{
                name: 'Coding'
              },
              {
                name: 'Marketing'
              }
              ];

})();
