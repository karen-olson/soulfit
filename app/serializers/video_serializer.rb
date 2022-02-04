class VideoSerializer < ActiveModel::Serializer
  attributes :id, :url, :title, :channelTitle, :likes, :views, :categoryId, :createdAt, :updatedAt, :duration, :publishedAt, :youtubeVideoId, :description, :thumbnailUrl
  has_one :videoAddedByUser, serializer: VideoAddedByUserSerializer

  def channelTitle 
    self.object.channel_title
  end

  def categoryId 
    self.object.category_id
  end

  def youtubeVideoId 
    self.object.youtube_video_id
  end

  def publishedAt 
    self.object.published_at
  end

  def thumbnailUrl 
    self.object.thumbnail_url
  end

  def videoAddedByUser 
    self.object.video_added_by_user
  end

  def createdAt 
    self.object.created_at
  end

  def updatedAt 
    self.object.updated_at
  end
end
