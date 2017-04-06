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
    if(this.seatView !== undefined){
      this.seatView.remove();
    }
    this.seatView = new App.SeatSelectionView({flightID: $(event.target.parentElement).attr("id")});
    this.seatView.render();
  }
});
