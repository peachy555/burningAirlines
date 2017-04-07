class ReservationsController < ApplicationController

  def index
    render json: Reservation.all
  end

  def create

    current_user = User.find_by_id(session[:user_id])

    new_reservation = Reservation.create(flight_id: params[:flight_id], seat_row: params[:seat_row], seat_col: params[:seat_col], user_id: current_user.id)

    render json: new_reservation
  end

end
