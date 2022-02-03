# test-task-movie-service
Test task for Junior Node.js developer position





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_PORT`
`DB_USERNAME`
`DB_PASSWORD`
`JWT_ACCESS_SECRET`


## Docker
   
```bash
 docker build . -t <your_account_name>/movies
```


```bash
 docker run -p 8000:8050 -e APP_PORT=8050 <your_account_name>/node-web-app  
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/misha-z1nchuk/test-task-movie-service.git
```

Go to the project directory

```bash
  cd <folder_name>
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run build
```

```bash
  npm run start
```
