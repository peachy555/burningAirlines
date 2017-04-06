var App = App || {}

App.Router = Backbone.Router.extend({
  routes: {
    "": "index"
  },
  index: function(){
    console.log("in Router search");
    if(this.indexView !== undefined){
      this.indexView.remove();
    }
    this.indexView = new App.FlightSearchView({collection: App.flights});
    this.indexView.render();
  }
})
