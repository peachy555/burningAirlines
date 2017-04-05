_.templateSettings = {
  interpolate : /\{\{=(.+?)\}\}/g,
  evaluate : /\{\{(.+?)\}\}/g
};

$(document).ready(function(){
  App.router = new App.Router();
  App.airplanes = new App.Airplanes();
  App.airplanes.fetch();
  App.flights = new App.Flights();
  App.flights.fetch().done(function(data){
    Backbone.history.start();
  });

  // setInterval(function(){
  //   App.flights.fetch();
  // }, 2000);
});
