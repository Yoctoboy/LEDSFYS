FROM python:3.8-slim-bullseye

WORKDIR /app

COPY requirementsARM.txt requirementsARM.txt

COPY . .

RUN pip3 install -r requirementsARM.txt

CMD [ "python3", "app.py" ]
