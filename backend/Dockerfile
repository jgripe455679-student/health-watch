FROM eclipse-temurin:17-jre
# RUN groupadd --system appuser && useradd --system --gid appuser appuser
# USER appuser:appuser
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
RUN curl -L -o /wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /wait-for-it.sh
EXPOSE 8080
ENTRYPOINT ["bin/sh", "-c", "/wait-for-it.sh ${MYSQL_HOST}:${MYSQL_PORT} -- java -jar app.jar"]

### Multi-stage Dockerfile
# FROM eclipse-temurin:17-jdk AS builder

# WORKDIR /app

# COPY gradlew .
# COPY gradle/ gradle/
# COPY build.gradle .
# COPY settings.gradle .

# COPY src/ src/

# RUN chmod +x ./gradlew

# RUN ./gradlew build -x test --no-daemon

# FROM eclipse-temurin:17-jdk

# WORKDIR /app

# ENV JAVA_TOOL_OPTIONS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"

# COPY --from=builder /app/build/libs/*.jar app.jar

# EXPOSE 8080 5005

# CMD ["java", "-jar", "app.jar"]