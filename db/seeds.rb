require 'rest-client'
require 'json'

# To access ENV variable, run file with rails db:seed instead of ruby db/seeds.rb. 
# When you run it with the ruby command, you don't have access to all the rails features.
@youtube_api_key = ENV["YOUTUBE_API_KEY"]
@youtube_api_key_2 = ENV["YOUTUBE_API_KEY_2"]

# If you're going to have users make API calls, consider making a class for it (service?)
# To help other users understand what's going on in seeds.rb, add comments and put notes in readme

# track amount of queries

@@category_query_count = 0
@@video_query_count = 0

@queries = [
    "dance%20fitness",
    "yoga",
    "warmup",
    "cooldown",
    "strength%20training",
    "mindfulness",
    "pilates",
    "hiit"
]

@video_ids_by_category = {
    "dance%20fitness" => [],
    "yoga" => [],
    "warmup" => [],
    "cooldown" => [],
    "strength%20training" => [],
    "mindfulness" => [],
    "pilates" => [],
    "hiit" => []
}

@video_data_by_category = {
    "dance%20fitness" => [],
    "yoga" => [],
    "warmup" => [],
    "cooldown" => [],
    "strength%20training" => [],
    "mindfulness" => [],
    "pilates" => [],
    "hiit" => []
}

def fetch_videos
    search_api_for_video_ids
    get_individual_video_data
    parse_video_data_by_category
end

def create_videos
    # videos = create_videos(parsed_video_hashes)
end


def search_api_for_video_ids
    @queries.each_with_index do |query, index|
        category_videos_array = search_api_by_category(query)
        category_video_ids_array = category_videos_array.map{|video| video["id"]["videoId"]}
        @video_ids_by_category["#{query}"] = category_video_ids_array
    end

end

def search_api_by_category(query)
    system("clear")
    @@category_query_count = @@category_query_count + 1
    puts "@@category_query_count:" + @@category_query_count.to_s + " - getting categories (should be 8)"
    category_videos = RestClient.get("https://youtube.googleapis.com/youtube/v3/search?&maxResults=10&order=viewCount&q=#{query}&relevanceLanguage=en&type=video&videoEmbeddable=true&videoSyndicated=true&key=#{@youtube_api_key}") 
    category_videos_array = JSON.parse(category_videos)["items"]
end

def get_individual_video_data
    @video_ids_by_category.each do |category, video_ids_array|

        video_ids_array.each do |id|
            video_data = search_api_for_video(id)
            video_hash = create_hash_from_video_data(video_data)
            @video_data_by_category["#{category}"] << video_hash
        end
    end
end

def search_api_for_video(id)
    system("clear")
    @@video_query_count = @@video_query_count + 1
    puts "@@video_query_count:" + @@video_query_count.to_s + " - getting videos (should be 80)"
    raw_video_data = RestClient.get("https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=%20id&part=statistics&part=snippet&id=#{id}&key=#{@youtube_api_key}")
    json_formatted_video_data = JSON.parse(raw_video_data)["items"]
end

def create_hash_from_video_data(video_array)
    video_hash = 
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


# CONTINUE HERE

def parse_video_data_by_category
    @video_data_by_category.each do |category, videos_array|

        videos_array.map do |video|
            if video[:duration]
                # NoMethodError: undefined method `[]' for nil:NilClass
# /Users/karen/Development/code/Mod4/soulfit/db/seeds.rb:146:in `convert_video_duration_to_seconds'
                duration_in_seconds = convert_video_duration_to_seconds(video[:duration])
                video[:duration] = duration_in_seconds
            else 
                video[:duration] = 0
            end

            url = convert_video_id_to_url(video[:youtube_video_id])
            video[:url] = url
            
            video
        end
    end
    binding.pry

    @video_data_by_category
end

def convert_video_duration_to_seconds(duration_string)

    # NoMethodError: undefined method `[]' for nil:NilClass
# /Users/karen/Development/code/Mod4/soulfit/db/seeds.rb:146:in `convert_video_duration_to_seconds'
    minutes_string_with_m = duration_string.match(/\d*M/)
    if minutes_string_with_m
        system("clear")
        puts minutes_string_with_m
        # printed 3M
        # minutes = minutes_string_with_m[0].match(/\d*/).to_s.to_i
        # took out [0] and then reached quota... womp womp.
        minutes = minutes_string_with_m.match(/\d*/).to_s.to_i
        puts "minutes " + minutes
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

def create_video_objects(parsed_video_hashes)
    # Do the same thing but have to do it once for each query
    # need to convert query into category name

    dance_fitness = Category.all.find{|category| category.name == "Dance Fitness"}
    video_objects = parsed_video_hashes.each do |video|
        dance_fitness.videos.create!(video)
    end
end
# puts "done"

# fetch_and_create_videos
fetch_videos
# create_videos



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