from controllers import *

# FastAPIのルーティング用関数
app.add_api_route('/', index)

# データの受け渡しできるかテスト
app.add_api_route('/data',get_data)

# # プロフィールの表示
# app.add_api_route('/get-profile',get_profile)

<<<<<<< HEAD
# app.add_api_route('/users/', read_users, methods=["GET"])
# app.add_api_route('/users/', create_user, methods=["POST"])
=======
# タグ検索リクエスト
app.add_api_route('/search-tag/{tag}', get_tag_result)
>>>>>>> e3b4707a19fa269dab47b41e6f9b8eaac7fd0dec
