var App = App || {};
var selectedSeat = '';

App.SeatSelectionView = Backbone.View.extend({
  initialize: function(options){
    this.listenTo(App.reservations, "change sync", this.render);
  },
  events: {
    "click .seats": "select",
    "click #reservationSubmit": "reservationSubmit"
  },
  el: "#seatSelection",
  render: function() {
    _.each(this.collection.models, function(reservation) {
      seatDivID = "#" + reservation.attributes.seat_row + "-" + reservation.attributes.seat_col;
      $(seatDivID).css( "backgroundColor", "red" );
    });
  },
  select: function(event) {
    var selectedSeatID = $(event.target).attr("id");
    if(selectedSeat.length !== 0) {
      $("#" + selectedSeat).css( "backgroundColor", "white" );
    }
    selectedSeat = selectedSeatID;

    var checkReservation = _.filter(this.collection.models, function(reservation) {
      var attr = reservation.attributes;
      return (attr.seat_row === selectedSeatID.split("-")[0]) &&
             (attr.seat_col === selectedSeatID.split("-")[1]);
    });
    if(checkReservation.length === 0) {
      $("#" + selectedSeatID).css( "backgroundColor", "gray" );
    } else {
      alert("Seat Reserved.");
    }
    // create reservation
  }
})
