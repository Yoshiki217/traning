# traning
https;//h-yoshiki.org

## 筋力トレーニング管理アプリ
* 2022年度後期システム開発概論演習 で作成したWEBアプリケーションです。
* フロントは `cd gpart` , `npm start` で起動します。
* バックエンドは, `cd backend` , `node router.js` で起動します。
* ansible = enviroment.yml で環境構築できます。

## 開発メンバー
1. SaiBunMei ( FrontEnd , Database Design )
2. deadpool252 (BackEnd , Database Design)
3. Yoshiki217 ( design , Task Management)
4. fujishimaion (design )

## 使用言語 : フレームワーク
* front : TypeScript
* back : Node 
* framework : React

### ブランチ命名規則
* `feature/description`
* `fix/description`
* `hotfix/description`

## ブランチ/参考URL
* https://bioscryptome.t-ohashi.info/git/naming/

## コミット命名規則
* `fix`：バグ修正
* `hotfix`：クリティカルなバグ修正
* `add`：新規（ファイル）機能追加
* `update`：機能修正（バグではない）
* `change`：仕様変更
* `clean`：整理（リファクタリング等）
* `disable`：無効化（コメントアウト等）
* `remove`：削除（ファイル）
* `upgrade`：バージョンアップ
* `revert`：変更取り消し

## コミット/参考URL
* https://qiita.com/itosho/items/9565c6ad2ffc24c09364


## 要件定義
### 開発
1.　ログイン機能(済)
2.　ユーザー登録機能(済)
3.　ユーザー情報編集機能
4.　ユーザー情報削除機能 
5.　ユーザー情報一覧表示機能 (済)
6.　ユーザー情報詳細表示機能(済)


追加Libraly
- DaisyUI : https://daisyui.com/docs/install/
- Chart.js : https://dev.classmethod.jp/articles/react-chartjs-2

実装したい機能
- googleアカウントログイン :  https://blog.sustenage.com/blog/0019-react-google-auth/
- 絞り込み検索機能付きのプルダウンリスト : https://dev.classmethod.jp/articles/implement-a-pull-down-list-with-filter-search-function-at-mui-v5-and-react-hook-form/
- (完了) アイコン画像アップロード : 