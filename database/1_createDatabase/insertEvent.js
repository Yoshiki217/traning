const mysql = require('mysql2')

cons =  mysql.createConnection({
    host: "localhost",
    user: "projectg",
    password: "fitness",
    database : "customerdb"
})

//1 腕
// アームカール
// インクラインアームカール
// トライセプスプレスダウン
// ライイングトライセプスエクステンション
// キックバック
// ハンマーカール
// ダンベルフレンチカール
// ダンベルフレンチプレス
// ダンベルカール
// バーカール
// イージーバーカール
// インクラインダンベルカール
// バイセプスカール
// プッシュダウン
sql = `insert into bodyParameter`

//2 肩
// パイクプッシュアップ
// 片腕横プッシュアップ（右）
// 片腕横プッシュアップ（左）
// プッシュザグランド
// 壁を使ってショルダープレス
// 壁倒立キープ
// 倒立から腕立て伏せ
// ダンベルショルダープレス
// ダンベルフロントプレス
// ダンベルサイドレイズ
// ダンベルフロントレイズ
// ダンベルアームカール
// ダンベルフレンチプレス
// ダンベルフレンチカール
// ダンベルカール
// バーカール
// イージーバーカール
// インクラインダンベルカール
// アップライトロウ
// オーバーヘッドプレス

//3 背中

//4 胸

//5 腹

//6 脚 表

//7 脚 裏




