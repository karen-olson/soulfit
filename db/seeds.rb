require 'rest-client'
require 'json'

# To access ENV variable, run file with rails db:seed instead of ruby db/seeds.rb. 
# When you run it with the ruby command, you don't have access to all the rails features.
@youtube_api_key = ENV["YOUTUBE_API_KEY"]


def fetch_and_create_videos
    video_ids_array = search_api_for_dance_fitness_videos
    video_data = get_dance_fitness_video_data_from_id(video_ids_array)
    parsed_video_data = parse_dance_fitness_video_data(video_data)
end

def search_api_for_dance_fitness_videos
    videos = RestClient.get("https://youtube.googleapis.com/youtube/v3/search?&maxResults=10&order=viewCount&q=dance%20fitness&relevanceLanguage=en&type=video&videoEmbeddable=true&videoSyndicated=true&key=#{@youtube_api_key}")
    videos_array = JSON.parse(videos)["items"]
    video_ids_array = videos_array.map{|video| video["id"]["videoId"]}
end

def get_dance_fitness_video_data_from_id(video_ids_array)
    video_data = []
    
    video_ids_array.each do |id|
        data = RestClient.get("https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=%20id&part=statistics&part=snippet&id=#{id}&key=#{@youtube_api_key}")
        json_data = JSON.parse(data)["items"]
        video_data << json_data
    end

    video_data
end

# https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=%20id&part=statistics&part=snippet&id=FNjIUpYz4hs&key=

def parse_dance_fitness_video_data(video_data)
    video_hashes = video_data.map do |video_array|
        {
            id: video_array[0]["id"],
            publishedAt: video_array[0]["snippet"]["publishedAt"],
            title: video_array[0]["snippet"]["title"],
            description: video_array[0]["snippet"]["description"],
            thumbnail_url: video_array[0]["snippet"]["thumbnails"]["default"]["url"],
            channelTitle: video_array[0]["snippet"]["channelTitle"],
            duration: video_array[0]["contentDetails"]["duration"],
            likeCount: video_array[0]["statistics"]["likeCount"],
            viewCount: video_array[0]["statistics"]["viewCount"],
            video_url: ""
        }
    end
    # map (?) over each video data array (within the array) and create a hash using relevant data?
    
    parsed_video_hashes = video_hashes.map do |video|
        binding.pry
        convert_video_duration_to_seconds(video)
        convert_video_id_to_url(video)
    end

    # convert duration
    # convert id to url
    # return an array of hashes with a stucture that matches what's in the DB
end

def convert_video_duration_to_seconds(video)
    duration = video[:duration]
    # use regex to get numbers before the M and then numbers after the M
    # use regex websites to test it out!!

    # [6] pry(main)> duration_array = duration.split("")
    # => ["P", "T", "3", "M", "2", "4", "S"]
    # [16] pry(main)> minutes = duration_array.slice_after(/T/).to_a
    # => [["P", "T"], ["3", "M", "2", "4", "S"]]

    # duration.filter{|}
    # PTXXMXXS
end

def convert_video_id_to_url(video)
    # base url is 'https://www.youtube.com/watch?v=#{id.videoId}
end

def create_videos(parsed_video_data)
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
    # dislikes (DELETE FROM DB)
    # views
    # category_id (USE FROM YOUTUBE OR MY OWN?)
    # duration_in_seconds
    
end


videos = fetch_and_create_videos
puts videos


# sam = User.create(name: "Sam", username: "sam1", admin: false, password: "12345", password_confirmation: "12345")
# puts sam.name

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