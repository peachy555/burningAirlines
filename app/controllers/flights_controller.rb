class FlightsController < ApplicationController

  def index
    render json: Flight.all.to_json(include: :reservations)
  end

  def search
  end

  def create

  end

end
