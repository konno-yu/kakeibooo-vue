## :robot: Kakeiboooとは

`Kakeibooo`は食費管理に特化した家計簿Webアプリケーションです. 

毎日の食費を家計簿に記録したり、家にどの食材がどのくらいあるのかを把握するお手伝いをします.


<img width="1000" alt="スクリーンショット 2020-06-17 23 19 40" src="https://user-images.githubusercontent.com/51043054/84909911-36219980-b0f1-11ea-9e44-fb97c52b3a3b.png">


## :muscle: Kakeiboooでできること
###### 家計簿をつける
カレンダーの形で毎日の食費を見える化します.
###### 食費を管理する
家計簿に入力された情報を使ってグラフで食費を見える化します.
###### 食材を管理する
家にどんな食材がどのくらいあるのかを見える化します.


## :computer: Kakeiboooの使い方

#### 1. Dockerのインストール
利用端末に合わせたDockerをインストールしておきます.

#### 2. PostgreSQLのインストールとデータベースの作成
PostgreSQLをインストールし、次のコマンドを入力してデータベースを作成します.

```SQL
CREATE DATABATE kakeibooo;
```

### 3. kakeiboooの起動
次のコマンドを入力して、kakeiboooを起動します.

```Bash
cd docker; docker-compose up -d   # Dockerコンテナの起動
cd ../client; npm run serve       # クライアントの起動
cd ../server; npm run start:dev   # サーバの起動
```

全て起動したら http://localhost:8080 にアクセスすることでkakeiboooを使えるようになります.

