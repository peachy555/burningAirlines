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
      var view = new App.FlightsListView({collection: App.flights});
      view.render();
    } else {
      var sortedFlight = _.filter(App.flights.models, function(flight) {
        var flightAttr = flight.attributes;
      	return ((flightAttr.destination === dest) && (flightAttr.departure === dept));
      });
      // sort this.collection

      App.flights2 = new App.Flights();
      App.flights2.fetch().done(function(data){
        var customCollection = App.flights2;
        customCollection.models = sortedFlight;
        customCollection.length = sortedFlight.length;
        // var view = new App.FlightsListView({collection: sortedFlight});
        if(customCollection.length === 0) {
          var view = new App.FlightsListView({collection: App.flights});
          alert("No matching search results!");
        } else {
          var view = new App.FlightsListView({collection: customCollection});
        }
        view.render();

      });
    }
  },
  search: function() {
    console.log("start FlightSearchView search");
    var dept = this.$el.find("#search_dept").val();
    var dest = this.$el.find("#search_dest").val();
    this.render(dept, dest);
  }
});
