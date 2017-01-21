class CreatePredictions < ActiveRecord::Migration[5.0]
  def change
    create_table :predictions do |t|
      t.integer :user_id
      t.decimal :height
      t.decimal :weight
      t.string :actual
      t.string :forecast

      t.timestamps
    end
  end
end
