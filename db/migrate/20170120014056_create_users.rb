class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.float :height
      t.float :weight
      t.date :created_time

      t.timestamps
    end
  end
end
