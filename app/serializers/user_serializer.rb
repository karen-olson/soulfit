class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :admin, :password_digest
  has_many :added_videos
  # cut down on how much video data is being displayed with user?
end
