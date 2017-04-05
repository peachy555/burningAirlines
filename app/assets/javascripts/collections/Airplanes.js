var App = App || {};

App.Airplanes = Backbone.Collection.extend({
  model: App.Airplane,
  url: '/airplanes'
})
