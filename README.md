# SimpleBoard

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
