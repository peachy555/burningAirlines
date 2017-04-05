var App = App || {}

App.Router = Backbone.Router.extend({
  routes: {
    "": "index"
  },
  index: function(){
    console.log("in Router search");
    var view = new App.FlightSearchView({collection: App.flights});
    view.render();
  }
})
