class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :admin

  has_many :uploaded_videos, through: :user_uploaded_videos
  has_many :favorited_videos, through: :user_favorited_videos

end
