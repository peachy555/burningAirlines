class ReservationsController < ApplicationController

  def index
    render json: Reservation.all
  end

  def create
    # binding.pry
    new_reservation = Reservation.create(flight_id: params[:flight_id], seat_row: params[:seat_row], seat_col: params[:seat_col], user_id: params[:user_id])

    render json: new_reservation
  end

end
