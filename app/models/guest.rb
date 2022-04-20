class Guest < ApplicationRecord
  belongs_to :selection
  has_many :votes, dependent: :destroy
end
