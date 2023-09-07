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

# 指定のuser_idを持つユーザテーブルを取得するリクエスト
app.add_api_route('/users/{user_id}', get_user_by_id, methods=['GET'])

# ユーザーテーブルを追加するリクエスト
app.add_api_route('/users/', create_user, methods=['POST'])

# ユーザテーブルを全取得するリクエスト
app.add_api_route('/users/', get_all_users, methods=['GET'])

# 特定のユーザーのプロフィール情報を取得するリクエスト
app.add_api_route('/get-profile/{user_id}', get_user_profile, methods=['GET'])

# 特定のユーザーのプロフィール情報を編集するリクエスト
app.add_api_route('/update-profile/{user_id}', update_user_profile, methods=['POST'])
