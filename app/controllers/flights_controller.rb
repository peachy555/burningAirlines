class FlightsController < ApplicationController

  def index
    render json: Flight.all
  end

  def search
  end

  def create

  end

end
