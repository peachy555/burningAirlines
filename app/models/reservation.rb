class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :flight
  validates_uniqueness_of :flight_id, scope: [:seat_row, :seat_col]
end
