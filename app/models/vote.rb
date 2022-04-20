class Vote < ApplicationRecord
  belongs_to :selection
  belongs_to :guest
  has_many :restaurants, through: :selections
end
