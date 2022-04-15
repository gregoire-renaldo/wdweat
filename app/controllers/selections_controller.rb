class SelectionsController < ApplicationController
  skip_before_action :authenticate_user!, only: :show

  def new
    @selection = Selection.new # needed to instantiate the form_for
  end

  def create
    @selection = Selection.new(selection_params)
    @selection.user_id = current_user.id

    if @selection.save
      # redirect_to selection_path(@selection)
      redirect_to selections_path(@selection)
    else
      # render "new"
      render "index"
    end
  end

  def index
    @selection = Selection.new
    @selections = Selection.all.where(user_id: current_user.id).order(date: :desc)
  end

  def show
    @selection = Selection.find(params[:id])
    @guest = Guest.new
  end

  def edit
    @selection = Selection.find(params[:id])
  end

  def update
    @selection = Selection.find(params[:id])
    @selection.update(selection_params)

    # no need for app/views/restaurants/update.html.erb
    redirect_to selections_path(@selection)
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
