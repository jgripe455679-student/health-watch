FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY messaging/. /app/

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# For better security in production, consider running as a non-root user.
# Uncomment the following lines if you want to create and switch to a non-root user.
# RUN addgroup --system app && adduser --system --ingroup app app && chown -R app:app /app
# USER app

COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]

