# SimpleBoard

[日本語](README.ja.md) · [English](README.md) · [한국어](README.ko.md)

SwiftとVaporで作られた簡単な掲示板の例です。 Swiftサーバーは投稿APIとブラウザ画面を提供します。

## 構造

```text
Sources/SimpleBoard/main.swift  Swift/Vapor 서버와 게시글 API
Public/index.html              브라우저 화면
Public/styles.css              화면 스타일
Public/main.js                 JavaScript UI 로직
```

## 実行

Swiftサーバーを実行します。

```sh
swift run SimpleBoard
```

サーバーが実行されると、ブラウザは下のアドレスを開きます。

```text
http://127.0.0.1:8080
```

## 画面機能

- 投稿リストを見る
- 投稿を書く
- 投稿を編集
- 投稿を削除
- リフレッシュ

現在の投稿はメモリにのみ保存されます。サーバーを再起動すると、作成した投稿は消えます。

## API

### 投稿リスト

```sh
curl http://127.0.0.1:8080/posts
```

### 投稿の作成

```sh
curl -X POST http://127.0.0.1:8080/posts \
  -H 'Content-Type: application/json' \
  -d '{"title":"첫 글","body":"Swift 서버에서 작성한 게시글입니다."}'
```

### 投稿の閲覧

```sh
curl http://127.0.0.1:8080/posts/<id>
```

### 投稿の編集

```sh
curl -X PATCH http://127.0.0.1:8080/posts/<id> \
  -H 'Content-Type: application/json' \
  -d '{"title":"수정한 제목"}'
```

### 投稿を削除

```sh
curl -X DELETE http://127.0.0.1:8080/posts/<id>
```
