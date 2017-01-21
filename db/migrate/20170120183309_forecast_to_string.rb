class ForecastToString < ActiveRecord::Migration[5.0]
	def up
		change_column :predictions, :forecast, :string
	end

	def down
		change_column :predictions, :forecast, :integer
	end
end
