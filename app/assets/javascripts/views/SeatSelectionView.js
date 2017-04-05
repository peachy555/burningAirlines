var App = App || {};

App.SeatSelectionView = Backbone.View.extend({
  initialize: function(options){
    debugger
    this.listenTo(App.reservations, "change sync", this.render);
  },
  events: {
    "click .seats": "select",
    "click #reservationSubmit": "reservationSubmit"
  },
  el: "#seatSelection",
  render: function() {
    // console.log("rendering seatSelection");
    // this.$el.html($("#seatSelectionTemplate").html());
  },
  select: function() {
    debugger
    // create reservation
  }
})
