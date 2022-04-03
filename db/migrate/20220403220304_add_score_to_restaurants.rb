class AddScoreToRestaurants < ActiveRecord::Migration[6.0]
  def change
    add_column :restaurants, :score, :integer, default: 0
  end
end
