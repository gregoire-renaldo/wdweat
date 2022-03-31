class CreateRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :price
      t.integer :rating
      t.string :image_url
      t.string :url

      t.timestamps
    end
  end
end
