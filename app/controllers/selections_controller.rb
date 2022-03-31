class SelectionsController < ApplicationController

  def new
    @selection = Selection.new # needed to instantiate the form_for
  end

  def create
    @selection = Selection.new(selection_params)
    @selection.user_id = current_user.id

    if @selection.save
      redirect_to selections_path
    else
      render "new"
    end
  end

  def index
    @selections = Selection.all
  end

  def show
    @selection = Selection.find(params[:id])
  end

  private

  def selection_params
    params.require(:selection).permit(:name, :date, :user_id)
  end
end
