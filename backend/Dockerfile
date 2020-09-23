FROM python:3.8

# Environment variables for python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# working directory in the container-VM
WORKDIR /code

# install dependencies with pipenv
COPY Pipfile Pipfile.lock /code/
RUN pip install pipenv && pipenv install --system

# Copy the full Django project
COPY . /code/