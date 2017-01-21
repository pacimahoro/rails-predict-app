class Api::V1::PredictionsController < Api::V1::BaseController

	def index
		respond_with Prediction.all
	end

	def create
		@username = 'pacimahoro'
		@apiKey = '5b837664319df469fc20128c6245670c2b3e1eef'
		@url_to_post_predictions = 'https://bigml.io/dev/prediction?username=' + @username + '&api_key=' + @apiKey

		par = params[:prediction]
		guess = {:height => par[:height], :weight => par[:weight]}
		result = HTTParty.post(@url_to_post_predictions,
			:body => {
					:logisticregression => 'logisticregression/58827b83014404400b000496',
					:input_data => guess
				}.to_json,
			:headers => { 'Content-Type' => 'application/json' }
			)

		response = JSON.parse(result.body)
		logger.debug 'Prediction Class: ' + response['output']

		guess[:forecast] = response['output']
		logger.debug guess
		@prediction = Prediction.create(guess)
		respond_with @prediction, json: @prediction
	end

	def destroy
		respond_with Prediction.destroy(params[:id])
	end

	def update
		prediction = Prediction.find(params["id"])
		prediction.update_attributes(prediction_params)
		respond_with prediction, json: prediction
	end

	private

	def prediction_params
		params.require(:prediction).permit(:id, :user_id, :height, :weight, :actual, :forecast)
	end
end
