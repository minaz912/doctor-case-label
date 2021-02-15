# Doctor Case Labeling

## Prerequisites for running the app locally

- Unix-like environment (MacOS, Linux, WSL). Windows is **not** supported
- node v14.x.y
- npm >= v7.x.y
- mongodb running locally

## How to run

### Seeding data

- It is highly recommended to seed the sample data by running `npm run seed:users` and `npm run seed:cases` from the backend folder

### Backend

- Go to the backend folder and install dependencies (if you haven't already done so) with `npm ci`
- Create a .env file inside the backend folder (see .env.example as an example, or for the purposes of this project, rename it to .env)
- Customize any variables you need in .env
- Run mongodb on port 27017 (or set MONGODB_URI in .env to customize the connection string)
- Run `npm start`

### Frontend

- In another terminal, go to the frontend folder and install dependencies (if you haven't already done so) with `npm ci`
- Run `npm start`
- Use seed user credentials to log in (username: `john_doe@example.com` and password: `example`)

## Viewing the API Docs

- You can view the API docs on `/api`

## Building and running production

- Run `npm run build`, you'll see the transpiled output in the `dist` directory (this works for both backend and frontend apps), you can then serve the output using your deployment configuration
- For the backend app, you can alternatively just run `npm start` to run in production mode
- For the backend app, you can also build a docker image using `docker build .`

## Testing & Coverage

### Backend

- Run `npm run test` to run tests. `npm run test:e2e` for e2e tests (you need to have MongoDB running), and `npm run test:cov` to check code coverage
- You can find the collected coverage in the generated `coverage` directory

## Config & .env

As previously mentioned, you must have a .env file in the backend folder with the following schema:

```env
# App operating mode, set to 'production' to run in production mode
NODE_ENV=

# Port the application will listen on
PORT=

# Connection URI for the database
MONGODB_URI=
```

## TODO

- Set up a logger and customize log levels
- Hash/salt passwords
- Add client tests
- UI improvements
- Health-check endpoint (useful when running in a containerized setup)
- CI config
- Development docker-compose config
- Pre-commit hooks (linting, type-checks)
