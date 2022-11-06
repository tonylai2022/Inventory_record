# Inventory Tracking Application 

## About this project
* This project is an inventory tracking web application for a logistics company.

## Features
* Provides basic CRUD Functionaliies:
    * [x] Create inventory items
    * [x] Edit Them
    * [x] Delete Them
    * [x] View a list of them

* Enables user to export product data to CSV format

## Get Started

### Prerequisites
* Get Docker and Docker Compose installed
* Mac and Windows users are suggested to download the ***Docker Desktop*** which includes Docker Compose along with other Docker apps
* For details of Docker, you may refer to the documentations below
  * [Get Docker](https://docs.docker.com/get-docker/)
  * [Install Docker Compose](https://docs.docker.com/compose/install/)

### Procedures
* Make sure Docker / Docker Desktop is running
* Make sure port 8080 is not being used by other applications
* Run the command below to run the application
    ```docker-compose up -d --build```
* Open browser to visit **localhost:8080**, and you should be able to see the application is running

## Technologies used
* TypeScript
* Express
* MySQL
* Docker