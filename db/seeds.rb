require 'rest-client'
require 'json'

# To access ENV variable, run file with rails db:seed instead of ruby db/seeds.rb. 
# When you run it with the ruby command, you don't have access to all the rails features.
@youtube_api_key = ENV["YOUTUBE_API_KEY"]
@queries = [
    "dance%20fitness"
    "yoga",
    "warmup",
    "cooldown",
    "strength%20training",
    "mindfulness",
    "pilates",
    "hiit"
]

def fetch_and_create_videos
    video_ids_array = search_api_for_dance_fitness_videos
    video_data = get_dance_fitness_video_data_from_id(video_ids_array)
    video_hashes = create_hashes_from_video_data(video_data)
    parsed_video_hashes = parse_dance_fitness_video_data(video_hashes)
    videos = create_videos(parsed_video_hashes)
end

def search_api_for_dance_fitness_videos
    # un-hardcode this later
    video_ids_by_category = {
        "dance%20fitness": [],
        "yoga": [],
        "warmup": [],
        "cooldown": [],
        "strength%20training": [],
        "mindfulness": [],
        "pilates": [],
        "hiit": []
    }

    @queries.each_with_index do |query, index|
        binding.pry
        category_videos = RestClient.get("https://youtube.googleapis.com/youtube/v3/search?&maxResults=10&order=viewCount&q=#{query}&relevanceLanguage=en&type=video&videoEmbeddable=true&videoSyndicated=true&key=#{@youtube_api_key}") 
        category_videos_array = JSON.parse(category_videos)["items"]
        category_video_ids_array = category_videos_array.map{|video| video["id"]["videoId"]}
        
        binding.pry
        # is this working??
        video_ids_by_category[:query] = category_video_ids_array
    end

    video_ids_by_category
end

def get_dance_fitness_video_data_from_id(video_ids_array)
    # now we have a hash of arrays coming in. how to handle this change?
    # for each query, look up the relevant array of ids
    # then, iterate over that array and get the video data for each id
    # save the video data over top of the video ids

    video_data = []
    
    video_ids_array.each do |id|
        data = RestClient.get("https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=%20id&part=statistics&part=snippet&id=#{id}&key=#{@youtube_api_key}")
        json_data = JSON.parse(data)["items"]
        video_data << json_data
    end

    video_data
end

def create_hashes_from_video_data(video_data)
    # Do the same thing but have to do it once for each query

    video_hashes = video_data.map do |video_array|
        {
            url: "",
            title: video_array[0]["snippet"]["title"],
            channel_title: video_array[0]["snippet"]["channelTitle"],
            likes: video_array[0]["statistics"]["likeCount"],
            views: video_array[0]["statistics"]["viewCount"],
            duration: video_array[0]["contentDetails"]["duration"],
            published_at: video_array[0]["snippet"]["publishedAt"],
            youtube_video_id: video_array[0]["id"],
            description: video_array[0]["snippet"]["description"],
            thumbnail_url: video_array[0]["snippet"]["thumbnails"]["default"]["url"],
        }
    end
end

def parse_dance_fitness_video_data(video_hashes)
    # Do the same thing but have to do it once for each query

    parsed_video_hashes = video_hashes.map do |video|
        duration_in_seconds = convert_video_duration_to_seconds(video[:duration])
        video[:duration] = duration_in_seconds
        
        url = convert_video_id_to_url(video[:youtube_video_id])
        video[:url] = url
        
        video
    end
end

def convert_video_duration_to_seconds(duration_string)
    minutes_string_with_m = duration_string.match(/\d*M/)
    if minutes_string_with_m
        minutes = minutes_string_with_m[0].match(/\d*/).to_s.to_i
    else
        minutes = 0
    end
        
    seconds_string_with_s = duration_string.match(/\d\dS/)[0]
    seconds = seconds_string_with_s.match(/\d\d/).to_s.to_i
    
    duration_in_seconds = (minutes * 60) + seconds
end

def convert_video_id_to_url(video_id)
    "https://www.youtube.com/watch?v=#{video_id}"
end

def create_videos(parsed_video_hashes)
    # Do the same thing but have to do it once for each query
    # need to convert query into category name

    dance_fitness = Category.all.find{|category| category.name == "Dance Fitness"}
    video_objects = parsed_video_hashes.each do |video|
        dance_fitness.videos.create!(video)
    end
end

fetch_and_create_videos


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