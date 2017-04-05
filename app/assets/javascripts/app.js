_.templateSettings = {
  interpolate : /\{\{=(.+?)\}\}/g,
  evaluate : /\{\{(.+?)\}\}/g
};

$(document).ready(function(){
  App.router = new App.Router();
  App.flights = new App.Flights();
  App.flights.fetch().done(function(data){
    Backbone.history.start();
  });

  App.airplanes = new App.Airplanes();
  App.airplanes.fetch();

  App.reservations = new App.Reservations();
  App.reservations.fetch();

  // setInterval(function(){
  //   App.flights.fetch();
  // }, 2000);
});
