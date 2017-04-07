class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(clean_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    else
      render :new
    end
  end

  def show
    @user_reservations = User.find_by_id(session[:user_id]).reservations
    @flights = Flight.all
    @planes = Airplane.all
  end

  private

  def clean_params
    params.require(:user).permit(:username, :email)  # Add user type later
  end
end
