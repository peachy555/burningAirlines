var App = App || {};

App.FlightSearchView = Backbone.View.extend({
  events: {
    "click #search_submit":"search"
  },
  el: "#flightSearch",
  render: function(){
    // console.log("render flightSearch");
    this.$el.html($("#flightSearchTemplate").html());
    var view = new App.FlightsListView({collection: this.collection});
    view.render();
  },
  search: function() {
    console.log("start FlightSearchView search");
  }
});
