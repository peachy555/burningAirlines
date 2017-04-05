var App = App || {};
var lastSelectedSeat = '';
var currSelectedSeat = '';

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
    "click .seats": "select"
    // "click #reservation_submit": "reservationSubmit"
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

    if(this.checkSeatAvailable()) {
      debugger
      if(lastSelectedSeat.length !== 0) {
        $("#" + lastSelectedSeat).css( "backgroundColor", "white" );
      }
      $("#" + currSelectedSeat).css( "backgroundColor", "gray" );
      lastSelectedSeat = currSelectedSeat;
      this.reservationSummary();
    } else {
      alert("Seat Reserved.");
    }

  },

  checkSeatAvailable: function() {
    var checkReservation = _.filter(this.collection.models, function(reservation) {
      var attr = reservation.attributes;
      return (attr.seat_row === currSelectedSeat.split("-")[0]) &&
             (attr.seat_col === currSelectedSeat.split("-")[1]);
    });
    return checkReservation.length === 0 ? true : false // Available(true), Reserved(false)
  }, //checkSeatAvailable

  reservationSummary: function() {

    var $summaryDisplay = $("#summary_display");
    $summaryDisplay.show();

    var flightID = this.collection.models[0].attributes.flight_id;
    var flightAttr = App.flights.get(flightID).attributes;
    var planeID = flightAttr.airplane_id;
    var planeAttr = App.airplanes.get(planeID).attributes;
    var $reservationSummary = $("#reservation_summary");
    $reservationSummary.empty();
    var $flightName = $("<div>").attr("id", "summary_flight_number")
                                .html("Flight Number: " + flightAttr.flight_number);

    var $flightDate = $("<div>").attr("id", "summary_flight_date")
                                .html("Date: " + flightAttr.flight_date);

    var $flightDirection = $("<div>").attr("id", "summary_flight_direction")
                      .html("Direction: " + flightAttr.departure + " -> " + flightAttr.destination);

    var $planeName = $("<div>").attr("id", "summary_plane_name")
                                .html("Plane Model: " + planeAttr.name);

    var $selectedSeat = $("<div>").attr("id", "summary_selected_seat")
              .html("Row: " + currSelectedSeat.split("-")[0] + " Col: " + currSelectedSeat.split("-")[1]);

    $reservationSummary.append($flightName)
                       .append($flightDate)
                       .append($flightDirection)
                       .append($planeName)
                       .append($selectedSeat);

    var thisThing = this;
    $(document).on("click", "#reservation_submit", function() {
      thisThing.reservationSubmit();
    });
  }, //reservationSummary

  reservationSubmit: function(e) {
    if(checkSeatAvailable()){
      console.log("seat still available");
      // Actual reservation
    } else {
      console.log("Seat taken!");
    }
  }
}); //App.SeatSelectionView
