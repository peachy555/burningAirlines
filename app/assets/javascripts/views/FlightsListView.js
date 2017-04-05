var App = App || {};

App.FlightsListView = Backbone.View.extend({
  events: {
    "click .flight_item": "showSeats"
  },
  initialize: function(options){
    this.listenTo(App.flights, "change sync", this.render);
  },
  el: "#flightsList",
  render: function(){
    var template = _.template($("#flightsListTemplate").html());
    this.$el.html(template(this.collection));
  },
  showSeats: function(event) {
    var flightID = $(event.target.parentElement).attr("id");
    var flight = this.collection.get(flightID);
    var plane = App.airplanes.get(flight.get("airplane_id"));
    var planeRow = plane.get("row");
    var planeCol = plane.get("col");

    for (var r = 1; r <= planeRow; r++) {
      var newRow = $("<div>").attr( "id" , "row" + r ).addClass("seatRows");
      $("#seatSelection").append(newRow);
      for (var c = 1; c <= planeCol; c++) {
        var newSeat = $("<div>").attr( "id" , r + "-" + c ).addClass("seats");
        newRow.append(newSeat);
      }
    }

    var flightReservation = _.filter(App.reservations.models, function(reservation) {
    	return reservation.attributes.flight_id === flight.id
    });

    this.collection.models = flightReservation;
    this.collection.length = flightReservation.length;

    var view = new App.SeatSelectionView({collection: this.collection});
    view.render();
    //
    // this.collection.models = [flight];
    // this.collection.length = 1;
    // var template = _.template($("#flightsListTemplate").html());
    // this.$el.html(template(this.collection));
  }
});
