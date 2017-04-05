class AirplanesController < ApplicationController

  def index
    render json: Airplane.all
  end

  def create

  end


end
