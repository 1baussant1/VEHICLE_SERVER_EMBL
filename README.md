## Vehicle Server Typescript

## Requirements

- nodejs
- docker
- oclif
- typescript

### Pre-requiste 1 - Installation of dependecies
```bash
npm install
```

### Pre-requiste 2 - Build Project
```bash
npm build
```

### Get authors
```bash
npm run hello-test
```

### Running the vehicle-server
First start a database server

```bash
npm run start-db
```

If issues with port, try this command
```bash
sudo systemctl stop postgresql
```
Then,
```bash
npm run start
```

## Test plan

#### Create a Vehicle 

```bash
curl -v -H "Content-Type: application/json" --data '{"shortcode": "abcd", "battery": 17, "position": { "latitude": 55.43, "longitude": 47.43}}' localhost:8080/vehicles | jq .
```

#### List all Vehicles

```bash
curl -v localhost:8080/vehicles
```

#### Delete a Vehicle

```bash
curl -v  -XDELETE localhost:8080/vehicles/${vehicle_id}
```
