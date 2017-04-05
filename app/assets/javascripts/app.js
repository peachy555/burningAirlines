_.templateSettings = {
  interpolate : /\{\{=(.+?)\}\}/g,
  evaluate : /\{\{(.+?)\}\}/g
};

$(document).ready(function(){
  App.router = new App.Router();
  App.flights = new App.Flights();
  App.flights.fetch().done(function(data){
    debugger
    Backbone.history.start();
  });

  // setInterval(function(){
  //   App.flights.fetch();
  // }, 2000);
});
