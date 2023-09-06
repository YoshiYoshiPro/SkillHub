from controllers import *

# FastAPIのルーティング用関数
app.add_api_route('/', index)

# データの受け渡しできるかテスト
app.add_api_route('/data',get_data)

# # プロフィールの表示
# app.add_api_route('/get-profile',get_profile)
