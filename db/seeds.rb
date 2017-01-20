# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create([
	{name: 'John Doe', height:6.2, weight: 150, created_time: Date.today.to_s},
	{name: 'Jane Smith', height:5.2, weight: 130, created_time: Date.today.to_s}
	])
