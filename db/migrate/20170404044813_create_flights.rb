class CreateFlights < ActiveRecord::Migration[5.0]
  def change
    create_table :flights do |t|
      t.string :flight_number
      t.date :date
      t.integer :airplane_id
      t.string :departure
      t.string :destination

      t.timestamps
    end
  end
end
