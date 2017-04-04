class SessionsController < ApplicationController
  def new
  end

  def create

    if user
      session[:user_id] = user.id
      redirect_to root_path
    else
      render :new
    end

  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path
  end
end
