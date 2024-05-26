FROM python:3.10-slim

WORKDIR /app/
# Copy the requirements.txt file to the working directory
COPY requirements.txt /app/

# Install system dependencies (if needed)
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc \
    && rm -rf /var/lib/apt/lists/*

RUN python -m venv env
RUN . venv/bin/activate && pip install -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . /app/

EXPOSE 8000

CMD ["sh", "-c", ". venv/bin/activate && uvicorn", "main:app", "--reload"]