const App = {
  initialize: function () {

    FormView.initialize();
    TasksView.initialize();
    App.fetch();

    setInterval(App.fetch, 10000);
  },

  fetch: function () {
    Tasks.fetch(TasksView.render);
  }
};