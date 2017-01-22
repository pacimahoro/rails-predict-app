Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
	namespace :api do
		namespace :v1 do
			resources :users, only: [:index, :create, :destroy, :update]
			resources :predictions, only: [:index, :create, :update]
		end
	end

	root to: 'site#index'
end
