class SelectionsController < ApplicationController
  skip_before_action :authenticate_user!, only: :show

  def new
    @selection = Selection.new # needed to instantiate the form_for
  end

  def create
    @selection = Selection.new(selection_params)
    @selection.user_id = current_user.id

    if @selection.save
      redirect_to selection_path(@selection)
    else
      render "new"
    end
  end

  def index
    @selections = Selection.all.where(user_id: current_user.id)
  end

  def show
    @selection = Selection.find(params[:id])
    @guest = Guest.new
  end

  def destroy
    @selection = Selection.find(params[:id])
    @selection.destroy

    redirect_to selections_path
  end

  private

  def selection_params
    params.require(:selection).permit(:name, :date, :user_id)
  end
end
