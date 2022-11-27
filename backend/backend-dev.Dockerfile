FROM python:3.8-slim-bullseye

WORKDIR /app

COPY requirements.txt requirements.txt

COPY . .

RUN apt update

RUN apt install -y python3-sdl2

RUN pip3 install -r requirements.txt

CMD [ "python3", "app.py", "--dev", "-n=300"]
