# Vehicle Server Typescript

## Current functionning Tag
v0.4.0

## Requirements
- nodejs
- docker
- oclif
- typescript

### Pre-requiste 1 - Installation of dependecies
```bash
npm install -g
```

### Pre-requiste 2 - Build Project
```bash
npm run build
```

## Running the vehicle-server
First start a database server
```bash
npm run start-db
```

If issues with port, try this command
```bash
sudo systemctl stop postgresql
```

Then start server,
```bash
npm run start
```


## Create a Vehicle 
In another terminal,
```bash
vehicle-cli create-vehicle --address=localhost:8080 --shortcode={max 4 characters} --battery={int} --latitude={float} --longitude={float}
```

if issues with vehicle-cli, try
```bash
npm run create-vehicle -- --address=localhost:8080 --shortcode={within 4 characters} --battery={int} --latitude={float} --longitude{float}
```

#### List all Vehicles

```bash
vehicle-cli list-vehicle --address=localhost:8080
```
if issues with vehicle-cli, try
```bash
npm run list-vehicle -- --address=localhost:8080
```

#### Delete a Vehicle

```bash
curl -v  -XDELETE localhost:8080/vehicles/${vehicle_id}
```
