class Selection < ApplicationRecord
  belongs_to :user
  has_many :restaurants, dependent: :destroy
  has_many :guests, dependent: :destroy
end
