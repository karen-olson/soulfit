require 'rest-client'
require 'json'

# To access ENV variable, run file with rails db:seed instead of ruby db/seeds.rb. 
# When you run it with the ruby command, you don't have access to all the rails features.
@youtube_api_key = ENV["YOUTUBE_API_KEY"]

# If you're going to have users make API calls, consider making a class for it (service?)
# To help other users understand what's going on in seeds.rb, add comments and put notes in readme

puts "🌱 Seeding..."

Video.destroy_all
Category.destroy_all

dance_fitness = Category.create(name: "Dance Fitness", img_url: "https://i.imgur.com/WyfjSt6.jpg")
yoga = Category.create(name: "Yoga", img_url: "https://i.imgur.com/cE6NOvP.jpg")
warmups = Category.create(name: "Warmups", img_url: "https://i.imgur.com/YI7GTQj.jpg")
cooldowns = Category.create(name: "Cooldowns", img_url: "https://i.imgur.com/BqX8UrV.jpg")
strength_training = Category.create(name: "Strength Training", img_url: "https://i.imgur.com/Vo9WsjT.jpg")
mindfulness = Category.create(name: "Mindfulness", img_url: "https://i.imgur.com/vxe5oBc.jpg")
pilates = Category.create(name: "Pilates", img_url: "https://i.imgur.com/iJ3ri9H.jpg")
hiit = Category.create(name: "HIIT", img_url: "https://i.imgur.com/8JWLShr.jpg")

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

@query_category_legend = {
    "dance%20fitness" => "Dance Fitness",
    "yoga" => "Yoga",
    "warmup" => "Warmups",
    "cooldown" => "Cooldowns",
    "strength%20training" => "Strength Training",
    "mindfulness" => "Mindfulness",
    "pilates" => "Pilates",
    "hiit" => "HIIT"
}

@video_ids_by_query = {
    "dance%20fitness" => [],
    "yoga" => [],
    "warmup" => [],
    "cooldown" => [],
    "strength%20training" => [],
    "mindfulness" => [],
    "pilates" => [],
    "hiit" => []
}

@video_data_by_query = {
    "dance%20fitness" => [],
    "yoga" => [],
    "warmup" => [],
    "cooldown" => [],
    "strength%20training" => [],
    "mindfulness" => [],
    "pilates" => [],
    "hiit" => []
}

def fetch_and_create_videos
    search_api_for_video_ids
    get_individual_video_data
    parse_video_data_by_query
    create_all_video_objects
end


## 1 SEARCH API FOR VIDEO IDS ###################
def search_api_for_video_ids
    @queries.each_with_index do |query, index|
        category_videos_array = search_api_by_category(query)
        category_video_ids_array = category_videos_array.map{|video| video["id"]["videoId"]}
        @video_ids_by_query["#{query}"] = category_video_ids_array
    end

end


# updated search specifying region and category (26)
# re-seed the DB using these parameters? --> make sure the category is correct
# https://youtube.googleapis.com/youtube/v3/search?part=snippet%2CcontentDetails%2Cstatistics&eventType=completed&maxResults=10&order=rating&publishedAfter=2017-01-01T00%3A00%3A00Z&q=dance%2520fitness&regionCode=US&relevanceLanguage=en&type=video&videoCategoryId=26&videoDimension=2d&videoEmbeddable=true&videoSyndicated=true&key=[YOUR_API_KEY]



def search_api_by_category(query)
    system("clear")
    @@category_query_count = @@category_query_count + 1
    puts "@@category_query_count:" + @@category_query_count.to_s + " - getting categories (should be 8)"
    category_videos = RestClient.get("https://youtube.googleapis.com/youtube/v3/search?&maxResults=10&order=viewCount&q=#{query}&relevanceLanguage=en&type=video&videoEmbeddable=true&videoSyndicated=true&key=#{@youtube_api_key}") 
    category_videos_array = JSON.parse(category_videos)["items"]
end
######################


## 2 GET INDIVIDUAL VIDEO DATA ##################
def get_individual_video_data
    @video_ids_by_query.each do |category, video_ids_array|
        
        video_ids_array.each do |id|
            video_data = search_api_for_video(id)
            video_hash = create_hash_from_video_data(video_data)
            @video_data_by_query["#{category}"] << video_hash
        end
    end
end

# YOUTUBE API LETS YOU SEARCH FOR A LIST OF VIDEO IDS - CAN REFACTOR TO SEARCH FOR THE WHOLE LIST AT ONCE
# INSTEAD OF SEARCHING VIDEO BY VIDEO.
# def search_api_for_videos(ids)
#     system("clear")
#     @@video_query_count = @@video_query_count + 1
#     puts "@@video_query_count:" + @@video_query_count.to_s + " - getting videos (should be 80)"

#     raw_video_data = RestClient.get("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=#{ids[0]}&#{ids[1]}&#{ids[2]}&#{ids[3]}&#{ids[4]}&#{ids[5]}&#{ids[6]}&#{ids[7]}&#{ids[8]}&#{ids[9]}&key=#{@youtube_api_key}")
        
#     json_formatted_video_data = raw_video_data.map{|raw_video| JSON.parse(raw_video)["items"]}
# end

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
            thumbnail_url: video_array[0]["snippet"]["thumbnails"]["medium"]["url"],
        }
end
######################


## 3 PARSE VIDEO DATA BY CATEGORY ##################
def parse_video_data_by_query
    @video_data_by_query.each do |category, videos_array|

        videos_array.map do |video|
            if video[:duration]
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
    @video_data_by_query
end

def convert_video_duration_to_seconds(duration_string)
    minutes_string_with_m = duration_string.match(/\d*M/).to_s
    if minutes_string_with_m
        minutes = minutes_string_with_m.chop.to_i
    else
        minutes = 0
    end
    
    seconds_string_with_s = duration_string.match(/\d\dS/).to_s
    seconds = seconds_string_with_s.chop.to_i
    
    duration_in_seconds = (minutes * 60) + seconds
end

def convert_video_id_to_url(video_id)
    "https://www.youtube.com/watch?v=#{video_id}"
end
####################


## 4 CREATE VIDEO OBJECTS ##################
##### WHY ARE DANCE FITNESS AND YOGA VIDEOS BEING CREATED TWICE?
def create_all_video_objects
    categories = get_categories

    categories.each_with_index do |category, index|
        # create_video_objects_by_category(category)
        query = @queries[index]

        @video_data_by_query[query].each do |video|
            category.videos.create!(video)
        end
    end
end

def get_categories
    # an array containing all category names
    category_names = @query_category_legend.values
    category_classes = []

    # an array containing references to all category classes
    category_names.each do |category_name| 
        category_name = Category.all.find{|category| category.name == category_name}
        category_classes << category_name
    end

    category_classes
end
####################

fetch_and_create_videos

puts "✅ Done seeding!"