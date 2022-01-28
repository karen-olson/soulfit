require 'rest-client'
require 'json'

@youtube_api_key = ENV["YOUTUBE_API_KEY"]

# https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&q=dance%20fitness&relevanceLanguage=en&type=video&videoEmbeddable=true&videoSyndicated=true&key=


def get_dance_fitness_video_data
    binding.pry

    videos = RestClient.get("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&q=dance%20fitness&relevanceLanguage=en&type=video&videoEmbeddable=true&videoSyndicated=true&key=#{@youtube_api_key}")
    videos_array = JSON.parse(videos)["items"]
    # edit video DB columns to match desired data
    #       incl thumbnail, likes/dislikes, views?
    # create video objects from the data and assign a category
end

def convert_video_duration_to_seconds(duration)
    # PTXXMXXS
end

def get_yoga_video_data
    # fetch yoga videos
end

def create_videos(dataset)
    # create videos from a dataset

    # INCLUDED IN RESULTS
    # id.videoId (add column)
    # snippet.publishedAt (add column)
    # snippet.channelId (add column)
    # snippet.title 
    # snippet.description (add column)
    # snippet.thumbnails.default.url (add column)
    # snippet.channelTitle (AKA content_creator)

    # STILL NEED
    # url (base url is 'https://www.youtube.com/watch?v=#{id.videoId}')
    # likes
    # dislikes
    # views
    # category_id
    # duration_in_seconds
    
end


get_dance_fitness_video_data
# def minutes_to_seconds(minutes, seconds)
#     (minutes * 60) + seconds
# end

sam = User.create(name: "Sam", username: "sam1", admin: false, password: "12345", password_confirmation: "12345")
puts sam.name

# dance_fitness = Category.create(name: "Dance Fitness", img_url: "https://i.imgur.com/WyfjSt6.jpg")
# yoga = Category.create(name: "Yoga", img_url: "https://i.imgur.com/cE6NOvP.jpg")
# warmups = Category.create(name: "Warmups", img_url: "https://i.imgur.com/YI7GTQj.jpg")
# cooldowns = Category.create(name: "Cooldowns", img_url: "https://i.imgur.com/BqX8UrV.jpg")
# strength_training = Category.create(name: "Strength Training", img_url: "https://i.imgur.com/Vo9WsjT.jpg")
# mindfulness = Category.create(name: "Mindfulness", img_url: "https://i.imgur.com/vxe5oBc.jpg")
# pilates = Category.create(name: "Pilates", img_url: "https://i.imgur.com/iJ3ri9H.jpg")
# hiit = Category.create(name: "HIIT", img_url: "https://i.imgur.com/8JWLShr.jpg")

# bollywood_25 = Video.create(url: "https://www.youtube.com/watch?v=GjV4iOSgClk", title: "Bollywood Dance Fitness Workout at Home | Latest Trending Songs 2022 | Fat Burning Cardio : Part 25", content_creator: "Dhruvi Shah", uploaded_by_user_id: 1, duration_in_seconds: 1148, likes: 0, dislikes: 0, views: 0, category_id: dance_fitness.id)

# bollywood_24 = Video.create(url: "https://www.youtube.com/watch?v=pRo0xuw2X_0", title: "Bollywood Dance Fitness Workout | #20yearsofK3G | Bole Chudiyan | Shava Shava | Easy Steps | Part 24", content_creator: "Dhruvi Shah", uploaded_by_user_id: 1, duration_in_seconds: 936, likes: 0, dislikes: 0, views: 0, category_id: dance_fitness.id)

# standing_yoga = Video.create(url: "https://www.youtube.com/watch?v=qJs5IpktRII", title: "20 minute Full Body STANDING Yoga Flow (no mat needed!)", content_creator: "SarahBethYoga", uploaded_by_user_id: 1, duration_in_seconds: 1273, likes: 0, dislikes: 0, views: 0, category_id: yoga.id)

# standing_yoga = Video.create(url: "https://www.youtube.com/watch?v=VaoV1PrYft4", title: "10 minute Morning Yoga for Beginners", content_creator: "SarahBethYoga", uploaded_by_user_id: 1, duration_in_seconds: minutes_to_seconds(9, 59), likes: 0, dislikes: 0, views: 0, category_id: yoga.id)