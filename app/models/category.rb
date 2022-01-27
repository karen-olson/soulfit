class Category < ApplicationRecord
    has_many :videos

    validates :name, presence: true, uniqueness: true
end
