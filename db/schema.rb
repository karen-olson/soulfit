# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_17_223732) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "img_url"
  end

  create_table "user_favorited_videos", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "video_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_favorited_videos_on_user_id"
    t.index ["video_id"], name: "index_user_favorited_videos_on_video_id"
  end

  create_table "user_uploaded_videos", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "video_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_uploaded_videos_on_user_id"
    t.index ["video_id"], name: "index_user_uploaded_videos_on_video_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.boolean "admin"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "videos", force: :cascade do |t|
    t.string "url"
    t.string "title"
    t.string "channel_title"
    t.integer "likes"
    t.integer "views"
    t.bigint "category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "duration"
    t.datetime "published_at"
    t.string "youtube_video_id"
    t.text "description"
    t.string "thumbnail_url"
    t.index ["category_id"], name: "index_videos_on_category_id"
  end

  add_foreign_key "user_favorited_videos", "users"
  add_foreign_key "user_favorited_videos", "videos"
  add_foreign_key "user_uploaded_videos", "users"
  add_foreign_key "user_uploaded_videos", "videos"
  add_foreign_key "videos", "categories"
end
