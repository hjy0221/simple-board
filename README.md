# SimpleBoard

[日本語](https://github.com/hjy0221/simple-board#%E6%97%A5%E6%9C%AC%E8%AA%9E) · [English](https://github.com/hjy0221/simple-board#english) · [한국어](https://github.com/hjy0221/simple-board#%ED%95%9C%EA%B5%AD%EC%96%B4)

## 日本語

[日本語](https://github.com/hjy0221/simple-board#%E6%97%A5%E6%9C%AC%E8%AA%9E) · [English](https://github.com/hjy0221/simple-board#english) · [한국어](https://github.com/hjy0221/simple-board#%ED%95%9C%EA%B5%AD%EC%96%B4)

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

## English

[日本語](https://github.com/hjy0221/simple-board#%E6%97%A5%E6%9C%AC%E8%AA%9E) · [English](https://github.com/hjy0221/simple-board#english) · [한국어](https://github.com/hjy0221/simple-board#%ED%95%9C%EA%B5%AD%EC%96%B4)

This is a simple bulletin board example created with Swift and Vapor. The Swift server provides both the post API and the browser screen.

## Structure

```text
Sources/SimpleBoard/main.swift  Swift/Vapor 서버와 게시글 API
Public/index.html              브라우저 화면
Public/styles.css              화면 스타일
Public/main.js                 JavaScript UI 로직
```

## run

Run Swift server.

```sh
swift run SimpleBoard
```

Once the server is running, open the address below in your browser.

```text
http://127.0.0.1:8080
```

## Screen functions

- View list of posts
- Write a post
- Edit post
- Delete post
- Refresh

Current posts are only stored in memory. If you restart the server, your posts will disappear.

## API

### Post list

```sh
curl http://127.0.0.1:8080/posts
```

### Create a post

```sh
curl -X POST http://127.0.0.1:8080/posts \
  -H 'Content-Type: application/json' \
  -d '{"title":"첫 글","body":"Swift 서버에서 작성한 게시글입니다."}'
```

### View posts

```sh
curl http://127.0.0.1:8080/posts/<id>
```

### Edit post

```sh
curl -X PATCH http://127.0.0.1:8080/posts/<id> \
  -H 'Content-Type: application/json' \
  -d '{"title":"수정한 제목"}'
```

### Delete post

```sh
curl -X DELETE http://127.0.0.1:8080/posts/<id>
```

## 한국어

[日本語](https://github.com/hjy0221/simple-board#%E6%97%A5%E6%9C%AC%E8%AA%9E) · [English](https://github.com/hjy0221/simple-board#english) · [한국어](https://github.com/hjy0221/simple-board#%ED%95%9C%EA%B5%AD%EC%96%B4)

Swift와 Vapor로 만든 간단한 게시판 예제입니다. Swift 서버가 게시글 API와 브라우저 화면을 함께 제공합니다.

## 구조

```text
Sources/SimpleBoard/main.swift  Swift/Vapor 서버와 게시글 API
Public/index.html              브라우저 화면
Public/styles.css              화면 스타일
Public/main.js                 JavaScript UI 로직
```

## 실행

Swift 서버를 실행합니다.

```sh
swift run SimpleBoard
```

서버가 실행되면 브라우저에서 아래 주소를 엽니다.

```text
http://127.0.0.1:8080
```

## 화면 기능

- 게시글 목록 보기
- 게시글 작성
- 게시글 수정
- 게시글 삭제
- 새로고침

현재 게시글은 메모리에만 저장됩니다. 서버를 재시작하면 작성한 글은 사라집니다.

## API

### 게시글 목록

```sh
curl http://127.0.0.1:8080/posts
```

### 게시글 작성

```sh
curl -X POST http://127.0.0.1:8080/posts \
  -H 'Content-Type: application/json' \
  -d '{"title":"첫 글","body":"Swift 서버에서 작성한 게시글입니다."}'
```

### 게시글 조회

```sh
curl http://127.0.0.1:8080/posts/<id>
```

### 게시글 수정

```sh
curl -X PATCH http://127.0.0.1:8080/posts/<id> \
  -H 'Content-Type: application/json' \
  -d '{"title":"수정한 제목"}'
```

### 게시글 삭제

```sh
curl -X DELETE http://127.0.0.1:8080/posts/<id>
```
