class FlightsController < ApplicationController

  def index
    render json: Flight.all.to_json(include: :reservations)
  end

  def search
  end

  def create
    new_flight = Flight.find_or_create_by(flight_number: params[:flight_number], date: params[:date], destination: params[:destination], departure: params[:departure], airplane_id: params[:airplane_id])
    binding.pry

    redirect_to flights_admin_path
  end

  def admin
    @flights = Flight.all.sort_by( &:date ).reverse
    @airplanes = Airplane.all
  end

end
