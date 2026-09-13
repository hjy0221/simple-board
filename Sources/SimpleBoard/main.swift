import Vapor

struct BoardPost: Content {
    let id: UUID
    var title: String
    var body: String
    let createdAt: Date
    var updatedAt: Date
}

struct CreatePostRequest: Content {
    let title: String
    let body: String
}

struct UpdatePostRequest: Content {
    let title: String?
    let body: String?
}

actor BoardStore {
    private var posts: [UUID: BoardPost] = [:]

    func list() -> [BoardPost] {
        posts.values.sorted { $0.createdAt > $1.createdAt }
    }

    func find(id: UUID) -> BoardPost? {
        posts[id]
    }

    func create(title: String, body: String) -> BoardPost {
        let now = Date()
        let post = BoardPost(
            id: UUID(),
            title: title,
            body: body,
            createdAt: now,
            updatedAt: now
        )
        posts[post.id] = post
        return post
    }

    func update(id: UUID, title: String?, body: String?) -> BoardPost? {
        guard var post = posts[id] else {
            return nil
        }

        if let title {
            post.title = title
        }

        if let body {
            post.body = body
        }

        post.updatedAt = Date()
        posts[id] = post
        return post
    }

    func delete(id: UUID) -> Bool {
        posts.removeValue(forKey: id) != nil
    }
}

func requirePostID(from req: Request) throws -> UUID {
    guard let id = req.parameters.get("id", as: UUID.self) else {
        throw Abort(.badRequest, reason: "Invalid post id.")
    }
    return id
}

let app = try await Application.make(.detect())
let store = BoardStore()

app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))

app.get { req async throws -> Response in
    try await req.fileio.asyncStreamFile(at: app.directory.publicDirectory + "index.html")
}

app.get("posts") { _ async in
    await store.list()
}

app.post("posts") { req async throws -> Response in
    let input = try req.content.decode(CreatePostRequest.self)
    let title = input.title.trimmingCharacters(in: .whitespacesAndNewlines)
    let body = input.body.trimmingCharacters(in: .whitespacesAndNewlines)

    guard !title.isEmpty else {
        throw Abort(.badRequest, reason: "Title is required.")
    }

    guard !body.isEmpty else {
        throw Abort(.badRequest, reason: "Body is required.")
    }

    let post = await store.create(title: title, body: body)
    return try await post.encodeResponse(status: .created, for: req)
}

app.get("posts", ":id") { req async throws -> BoardPost in
    let id = try requirePostID(from: req)
    guard let post = await store.find(id: id) else {
        throw Abort(.notFound, reason: "Post not found.")
    }
    return post
}

app.patch("posts", ":id") { req async throws -> BoardPost in
    let id = try requirePostID(from: req)
    let input = try req.content.decode(UpdatePostRequest.self)

    let title = input.title?.trimmingCharacters(in: .whitespacesAndNewlines)
    let body = input.body?.trimmingCharacters(in: .whitespacesAndNewlines)

    if let title, title.isEmpty {
        throw Abort(.badRequest, reason: "Title cannot be empty.")
    }

    if let body, body.isEmpty {
        throw Abort(.badRequest, reason: "Body cannot be empty.")
    }

    guard let post = await store.update(id: id, title: title, body: body) else {
        throw Abort(.notFound, reason: "Post not found.")
    }
    return post
}

app.delete("posts", ":id") { req async throws -> HTTPStatus in
    let id = try requirePostID(from: req)
    guard await store.delete(id: id) else {
        throw Abort(.notFound, reason: "Post not found.")
    }
    return .noContent
}

try await app.execute()
