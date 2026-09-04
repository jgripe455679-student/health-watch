FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get upgrade -y gzip \
    && rm -rf /var/lib/apt/lists/* && \
    # For better security in production, consider running as a non-root user.
    # Uncomment the following lines if you want to create and switch to a non-root user.
    # RUN addgroup --system app && adduser --system --ingroup app app && chown -R app:app /app
    groupadd --system app && \
    useradd --system --gid app --create-home --home-dir /home/app app && \
    chown -R app:app /app


COPY messaging/. /app/

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt


COPY --chown=app:app entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

USER app

ENTRYPOINT [ "/app/entrypoint.sh" ]

