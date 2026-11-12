# SimpleBoard

[日本語](README.ja.md) · [English](README.md) · [한국어](README.ko.md)

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
