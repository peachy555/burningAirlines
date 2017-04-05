var App = App || {};
var selectedSeat = '';

App.SeatSelectionView = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(App.reservations, "change sync", this.render);
    // $(document).on("click", "#reservation_submit", function() {
    //   this.reservationSubmit();
    // });
  },

  events: {
    "click .seats": "select",
    "click #reservation_submit": "reservationSubmit"
  },

  el: "#seat_selection",

  render: function() {
    _.each(this.collection.models, function(reservation) {
      seatDivID = "#" + reservation.attributes.seat_row + "-" + reservation.attributes.seat_col;
      $(seatDivID).css( "backgroundColor", "red" );
    });
  },

  select: function(event) {
    if(this.checkSeatAvailable(event)) {
      if(selectedSeat.length !== 0) {
        $("#" + selectedSeat).css( "backgroundColor", "white" );
      }
      var selectedSeatID = $(event.target).attr("id");
      $("#" + selectedSeatID).css( "backgroundColor", "gray" );
      selectedSeat = selectedSeatID;
    } else {
      alert("Seat Reserved.");
    }

    this.reservationSummary();
  },

  checkSeatAvailable: function(event) {
    var checkReservation = _.filter(this.collection.models, function(reservation) {
      var attr = reservation.attributes;
      return (attr.seat_row === $(event.target).attr("id").split("-")[0]) &&
             (attr.seat_col === $(event.target).attr("id").split("-")[1]);
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
              .html("Row: " + selectedSeat.split("-")[0] + " Col: " + selectedSeat.split("-")[1]);

    $reservationSummary.append($flightName)
                       .append($flightDate)
                       .append($flightDirection)
                       .append($planeName)
                       .append($selectedSeat);
  }, //reservationSummary

  reservationSubmit: function() {
    debugger
  }
}); //App.SeatSelectionView
