class AirplanesController < ApplicationController

  def index
    render json: Airplane.all
  end

  def create
    new_airplane = Airplane.find_or_create_by(name: params[:name], col: params[:col], row: params[:row])
    redirect_to airplanes_admin_path
  end

  def admin
    @airplanes = Airplane.all
  end


  private

  def clean_params
    params.require(:airplane).permit(:name, :row, :col)
  end

end
