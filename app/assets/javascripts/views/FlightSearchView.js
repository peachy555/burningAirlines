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
    if( !(typeof dept === "undefined" && typeof dest === "undefined") ){
      var sortedFlight = _.filter(this.collection.models, function(flight) {
        var flightAttr = flight.attributes
      	return ((flightAttr.destination === dest) && (flightAttr.departure === dept))
      });
      console.log("filtering search");
      // sort this.collection
      this.collection.models = sortedFlight;
      // var view = new App.FlightsListView({collection: sortedFlight});
      var view = new App.FlightsListView({collection: this.collection});
      view.render();
    } else {
      var view = new App.FlightsListView({collection: this.collection});
      view.render();
    }
  },
  search: function() {
    console.log("start FlightSearchView search");
    var dept = this.$el.find("#search_dept").val();
    var dest = this.$el.find("#search_dest").val();
    this.render(dept, dest);
  }
});
