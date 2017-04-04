class AddSeatColToReservations < ActiveRecord::Migration[5.0]
  def change
    add_column :reservations, :seat_col, :string
  end
end
