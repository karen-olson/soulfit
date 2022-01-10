# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# created using Postman
# karen1 --> password: "cheese"
# Tyler1 --> password: "abcde"

sam = User.create(name: "Sam", username: "sam1", admin: false, password: "12345", password_confirmation: "12345")