class AddSelectionToRestaurants < ActiveRecord::Migration[6.0]
  def change
    add_reference :restaurants, :selection, null: false, foreign_key: true
  end
end
