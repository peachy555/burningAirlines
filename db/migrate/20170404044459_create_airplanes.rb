class CreateAirplanes < ActiveRecord::Migration[5.0]
  def change
    create_table :airplanes do |t|
      t.string :name
      t.integer :row
      t.integer :col

      t.timestamps
    end
  end
end
