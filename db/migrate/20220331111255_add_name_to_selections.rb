class AddNameToSelections < ActiveRecord::Migration[6.0]
  def change
    add_column :selections, :name, :string
  end
end
