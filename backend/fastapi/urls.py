from controllers import *

# FastAPIのルーティング用関数
app.add_api_route('/', index)

# データの受け渡しできるかテスト
app.add_api_route('/data',get_data)

# # プロフィールの表示
# app.add_api_route('/get-profile',get_profile)

# タグ検索リクエスト
app.add_api_route('/search-tag/{tag}', get_tag_result)

# タグサジェストリクエスト
app.add_api_route('/get-suggested-tags/{tag_substring}', get_suggested_tags)

# 新しいエンドポイントを追加
app.add_api_route('/users/{user_id}', get_user_by_id, methods=['GET'])

# 新しいエンドポイントを追加
app.add_api_route('/users/', create_user, methods=['POST'])

# 新しいエンドポイントを追加
app.add_api_route('/users/', get_all_users, methods=['GET'])
