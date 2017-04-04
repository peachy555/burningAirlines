class FlightsController < ApplicationController

  def index
    all_flights = Flight.all();
  end

  def show
    # flight_id = params[:id]
    # airplane_id = Flight.find(flight_id).airplane_id
    # airplane = Airplane.find(airplane_id)
    # capacity = [airplane.row airplane.col]
    # airplane_map = Array.new(airplane.row){Array.new(airplane.col)}
    # reservations = Reservation.where(flight_id: flight_id)  ==> seat_row, seat_col

  end

  def search

  end

  def create

  end


end
