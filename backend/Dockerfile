FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /app
COPY gradlew build.gradle settings.gradle ./
COPY gradle ./gradle
COPY src ./src
RUN chmod +x gradlew
RUN ./gradlew --no-daemon bootJar -x test

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && groupadd --system appuser \
    && useradd --system --gid appuser appuser \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/build/libs/*.jar app.jar
USER appuser:appuser
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD curl --fail http://localhost:8080/actuator/health/readiness || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]