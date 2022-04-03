class Restaurant < ApplicationRecord
  belongs_to :selection

  def vote
    self.score += 1
    
  end

end
