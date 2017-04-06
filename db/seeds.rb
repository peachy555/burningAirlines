# This file should contain all the record creation needed to seed the datebase with its default values.
# The date can then be loaded with the rails db:seed command (or created alongside the datebase with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Airplane.destroy_all
Flight.destroy_all
Reservation.destroy_all

users = [
  {
    username: "Peach",
    user_type: "Admin"
  },
  {
    username: "Jared",
    user_type: "Admin"
  },
  {
    username: "Diego",
    user_type: "Customer"
  },
  {
    username: "Hen",
    user_type: "Customer"
  },
  {
    username: "Petr",
    user_type: "Customer"
  },
  {
    username: "Kevin",
    user_type: "Customer"
  },
  {
    username: "Gin",
    user_type: "Customer"
  },
  {
    username: "Xander",
    user_type: "Admin"
  },
  {
    username: "Luke",
    user_type: "Admin"
  },
]

users.each do |user|
  new_user = User.new(username: user[:username], user_type: user[:user_type])
  new_user.save
end

# --------------------------------------------------------------------------------------

airplanes = [
  {
    name: "Burning Airplane",
    # row and col represent plane capacity of 10X6 seats
    row: 10,
    col: 6,
    flights: [
      {
        flight_number: "111",
        date: "2017-01-12",
        departure: "SYD",
        destination: "MEL",
        reservations: [
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..10).to_s,
            seat_col: rand(1..6).to_s
          },
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..10).to_s,
            seat_col: rand(1..6).to_s
          },
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..10).to_s,
            seat_col: rand(1..6).to_s
          },
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..10).to_s,
            seat_col: rand(1..6).to_s
          }
        ] # reservations
      },
      {
        flight_number: "911",
        date: "2017-04-22",
        departure: "PER",
        destination: "DRW",
        reservations: [
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..10).to_s,
            seat_col: rand(1..6).to_s
          }
        ] # reservations
      },
      {
        flight_number: "123",
        date: "2017-01-31",
        departure: "HBA",
        destination: "PER",
        reservations: [
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..10).to_s,
            seat_col: rand(1..6).to_s
          },
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..10).to_s,
            seat_col: rand(1..6).to_s
          },
        ] # reservations
      },

    ] # flights
  }, # Burning Airplane
  {
    name: "Hell's Trip",
    row: 8,
    col: 4,
    flights: [
      {
        flight_number: "289",
        date: "2017-05-24",
        departure: "MEL",
        destination: "CBR",
        reservations: [
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..8).to_s,
            seat_col: rand(1..4).to_s
          },
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..8).to_s,
            seat_col: rand(1..4).to_s
          }
        ] # reservations
      },
      {
        flight_number: "999",
        date: "2017-02-04",
        departure: "MEL",
        destination: "HBA",
        reservations: [
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..8).to_s,
            seat_col: rand(1..4).to_s
          },
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..8).to_s,
            seat_col: rand(1..4).to_s
          },
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..8).to_s,
            seat_col: rand(1..4).to_s
          },
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..8).to_s,
            seat_col: rand(1..4).to_s
          },
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..8).to_s,
            seat_col: rand(1..4).to_s
          },
          {
            user_id: User.all[rand(9)].id,
            seat_row: rand(1..8).to_s,
            seat_col: rand(1..4).to_s
          }
        ] # reservations
      }
    ] # flights
  },
]

airplanes.each do |airplane|
  # Create airplanes
  new_airplane = Airplane.create(name: airplane[:name], row: airplane[:row], col: airplane[:col])
  airplane[:flights].each do |flight|
    # Create pages
    new_flight = Flight.create(flight_number: flight[:flight_number], date: flight[:date], departure: flight[:departure], destination: flight[:destination], airplane_id: new_airplane.id)
    flight[:reservations].each do |reservation|
      # Create tags
      new_reservation = Reservation.create(user_id: reservation[:user_id], flight_id: new_flight.id, seat_row: reservation[:seat_row], seat_col: reservation[:seat_col])
    end
  end
end
