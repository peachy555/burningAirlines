var App = App || {};
var currSelectedSeat = '';
var lastSelectedSeat = '';

App.SeatSelectionView = Backbone.View.extend({

  initialize: function(options){
    this.flightID = options.flightID;
    this.flight = App.flights.get(this.flightID);
    this.listenTo(App.flights, "change", this.render);
  },

  events: {
    "click .seats": "select",
    "click #reservation_submit": function(){
      this.reservationSubmit(currSelectedSeat);
    }
  },

  el: "#seat_selection",

  render: function() {
    var plane = App.airplanes.get(this.flight.get("airplane_id"));

    var template = _.template($("#seatSelectionTemplate").html())
    $("#seat_grid").html(template({plane: plane, reservations: this.flight.get("reservations")}));
    if( (currSelectedSeat.length !== 0) && (this.checkSeatAvailable(currSelectedSeat)) ) {
      $("#" + currSelectedSeat).css( "backgroundColor", "gray" );
    }
  },

  select: function(event) {
    currSelectedSeat = $(event.target).attr("id");
    this.render();

    if(this.checkSeatAvailable(currSelectedSeat)) {
      if(lastSelectedSeat.length !== 0) {
        if(this.checkSeatAvailable(lastSelectedSeat)) {
        $("#" + lastSelectedSeat).css( "backgroundColor", "white" );
        console.log("turn white");
        }
      }
      $("#" + currSelectedSeat).css( "backgroundColor", "gray" );
      this.reservationSummary(currSelectedSeat);
      lastSelectedSeat = currSelectedSeat;
    } else {
      alert("Seat Reserved.");
    }
  },

  checkSeatAvailable: function(currSelectedSeat) {
    var reservations = this.flight.get("reservations");
    var checkReservation = _.filter(reservations, function(res) {
      return ((res.seat_row === currSelectedSeat.split("-")[0]) &&
          		(res.seat_col === currSelectedSeat.split("-")[1]))
    });

    return checkReservation.length === 0 ? true : false // Available(true), Reserved(false)
  }, //checkSeatAvailable

  reservationSummary: function(currSelectedSeat) {

    var $summaryDisplay = $("#summary_display");
    $summaryDisplay.show();

    var flightAttr = App.flights.get(this.flightID).attributes;
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

      this.createReservation();

      console.log("reservation made");
      // Actual reservation
    } else {
      console.log("Seat taken!");
    }
  },
  createReservation: function () {
    var seatRow = $("#summary_seat_row_data").html();
    var seatCol = $("#summary_seat_col_data").html();
    var userId = 1;

     // Make Rails create reservation as well
    App.reservations.create({
      flight_id: parseInt(this.flightID),
      seat_row: seatRow,
      seat_col: seatCol,
      user_id: userId
    });

  },
  remove: function() {
    // this.$el.empty().off(); /* off to unbind the events */
    currSelectedSeat = '';
    lastSelectedSeat = '';
    this.$el.off();
    $("#reservation_summary").empty();
    $("#seat_grid").empty();
    this.stopListening();
    return this;
  }
}); //App.SeatSelectionView
