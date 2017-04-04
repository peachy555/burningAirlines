class AddSeatRowToReservations < ActiveRecord::Migration[5.0]
  def change
    add_column :reservations, :seat_row, :string
  end
end
