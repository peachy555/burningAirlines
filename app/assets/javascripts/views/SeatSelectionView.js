var App = App || {};
var currSelectedSeat = '';
var lastSelectedSeat = '';

App.SeatSelectionView = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(App.reservations, "change sync", this.render);
    // this.listenTo($("#reservation_submit"), "click", this.reservationSubmit);
    // $(document).on("click", "#reservation_submit", function() {
    //   debugger
    //   this.reservationSubmit();
    // });
  },

  events: {
    "click .seats": "select",
    "click #reservation_submit": function(){
      this.reservationSubmit(currSelectedSeat);
    }
  },

  el: "#seat_selection",

  render: function() {
    _.each(this.collection.models, function(reservation) {
      seatDivID = "#" + reservation.attributes.seat_row + "-" + reservation.attributes.seat_col;
      $(seatDivID).css( "backgroundColor", "red" );
    });
  },

  select: function(event) {
    currSelectedSeat = $(event.target).attr("id");

    if(this.checkSeatAvailable(currSelectedSeat)) {
      if(lastSelectedSeat.length !== 0) {
        $("#" + lastSelectedSeat).css( "backgroundColor", "white" );
      }
      $("#" + currSelectedSeat).css( "backgroundColor", "gray" );
      lastSelectedSeat = currSelectedSeat;
      this.reservationSummary(currSelectedSeat);
    } else {
      alert("Seat Reserved.");
    }
  },

  checkSeatAvailable: function(currSelectedSeat) {
    var checkReservation = _.filter(this.collection.models, function(reservation) {
      var attr = reservation.attributes;
      return (attr.seat_row === currSelectedSeat.split("-")[0]) &&
             (attr.seat_col === currSelectedSeat.split("-")[1]);
    });
    return checkReservation.length === 0 ? true : false // Available(true), Reserved(false)
  }, //checkSeatAvailable

  reservationSummary: function(currSelectedSeat) {

    var $summaryDisplay = $("#summary_display");
    $summaryDisplay.show();

    var flightID = this.collection.models[0].attributes.flight_id;
    var flightAttr = App.flights.get(flightID).attributes;
    var planeID = flightAttr.airplane_id;
    var planeAttr = App.airplanes.get(planeID).attributes;
    var seatArr = currSelectedSeat.split("-");

    var $reservationSummary = $("#reservation_summary");

    var template = _.template($("#reservationSummaryTemplate").html());
    var content = template({flight: flightAttr, plane: planeAttr, seat: seatArr});
    $reservationSummary.html(content);

  }, //reservationSummary

  reservationSubmit: function(currSelectedSeat) {
    if(this.checkSeatAvailable(currSelectedSeat)){
      console.log("seat still available");
      // Actual reservation
    } else {
      console.log("Seat taken!");
    }
  }
}); //App.SeatSelectionView
