// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "SimpleBoard",
    platforms: [
        .macOS(.v14)
    ],
    dependencies: [
        .package(url: "https://github.com/vapor/vapor.git", from: "4.0.0")
    ],
    targets: [
        .executableTarget(
            name: "SimpleBoard",
            dependencies: [
                .product(name: "Vapor", package: "vapor")
            ]
        )
    ]
)
