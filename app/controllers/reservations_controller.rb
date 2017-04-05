class ReservationsController < ApplicationController

  def index
    render json: Reservation.all
  end

  def create

  end

end
