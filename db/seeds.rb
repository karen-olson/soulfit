# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def minutes_to_seconds(minutes, seconds)
    (minutes * 60) + seconds
end

sam = User.create(name: "Sam", username: "sam1", admin: false, password: "12345", password_confirmation: "12345")

dance_fitness = Category.create(name: "Dance Fitness")
yoga = Category.create(name: "Yoga")
warmups = Category.create(name: "Warmups")
cooldowns = Category.create(name: "Cooldowns")
strength_training = Category.create(name: "Strength Training")
mindfulness = Category.create(name: "Mindfulness")
pilates = Category.create(name: "Pilates")
hiit = Category.create(name: "HIIT")

bollywood_25 = Video.create(url: "https://www.youtube.com/watch?v=GjV4iOSgClk", title: "Bollywood Dance Fitness Workout at Home | Latest Trending Songs 2022 | Fat Burning Cardio : Part 25", content_creator: "Dhruvi Shah", uploaded_by_user_id: 1, duration_in_seconds: 1148, likes: 0, dislikes: 0, views: 0, category_id: dance_fitness.id)

bollywood_24 = Video.create(url: "https://www.youtube.com/watch?v=pRo0xuw2X_0", title: "Bollywood Dance Fitness Workout | #20yearsofK3G | Bole Chudiyan | Shava Shava | Easy Steps | Part 24", content_creator: "Dhruvi Shah", uploaded_by_user_id: 1, duration_in_seconds: 936, likes: 0, dislikes: 0, views: 0, category_id: dance_fitness.id)

standing_yoga = Video.create(url: "https://www.youtube.com/watch?v=qJs5IpktRII", title: "20 minute Full Body STANDING Yoga Flow (no mat needed!)", content_creator: "SarahBethYoga", uploaded_by_user_id: 1, duration_in_seconds: 1273, likes: 0, dislikes: 0, views: 0, category_id: yoga.id)

standing_yoga = Video.create(url: "https://www.youtube.com/watch?v=VaoV1PrYft4", title: "10 minute Morning Yoga for Beginners", content_creator: "SarahBethYoga", uploaded_by_user_id: 1, duration_in_seconds: minutes_to_seconds(9, 59), likes: 0, dislikes: 0, views: 0, category_id: yoga.id)