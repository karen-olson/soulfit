class CategoriesController < ApplicationController

    def index 
        categories = Category.all
        render json: categories
    end

    def show
        category = find_category
        render json: category
    end

    def create
        category = Category.create!(category_params)
        render json: category, status: :created
    end

    def update
        category = find_category
        category.update!(category_params)
        render json: category, status: :accepted
    end

    def destroy
        category = find_category
        category.destroy
        head :no_content
    end

    private

    def find_category
        Category.find(params[:id])
    end

    def category_params
        params.permit(:id, :name, :img_url)
    end
end
