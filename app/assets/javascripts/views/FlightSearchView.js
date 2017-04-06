var App = App || {};

App.FlightSearchView = Backbone.View.extend({
  // initialize: function() {
  //   this.render();
  // },
  events: {
    "click #search_submit":"search"
  },
  el: "#flightSearch",
  render: function(dept, dest){
    this.$el.html($("#flightSearchTemplate").html());
    // Filter for desired flights
    if( (typeof dept === "undefined" && typeof dest === "undefined") ||
        (dept.length === 0 && dest.length === 0) ){
      // Display all flights for first time page renders or empty search inputs
      var view = new App.FlightsListView({collection: App.flights});
      view.render();
    } else {
      // searchFlights
      var searchedFlights = _.filter(App.flights.models, function(flight) {
        var flightAttr = flight.attributes;
      	return ((flightAttr.destination === dest) && (flightAttr.departure === dept));
      });
      // Display search results
      var searchedFlightsCollection = new App.Flights(searchedFlights);
      if(searchedFlights.length === 0) {
        var view = new App.FlightsListView({collection: App.flights});
      } else {
        var view = new App.FlightsListView({collection: searchedFlightsCollection});
      }
      view.render();
    }
  },
  search: function() {
    var dept = this.$el.find("#search_dept").val();
    var dest = this.$el.find("#search_dest").val();
    this.render(dept, dest);
  }
});
