class Selection < ApplicationRecord
  belongs_to :user
  has_many :restaurants
  has_many :guests
end
