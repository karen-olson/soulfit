class UserAddedVideoSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :video_id
  has_one :user
  has_one :video
end
