# Contributing

## How to setup environment
Please refer to GETTING-STARTED.md on how to install.

## Using external libraries and npm modules
If you want to use external libraries or npm modules when contributing to code, please save the node modules locally. The `docker-compose.yaml` file has been setup to mount the `node_modules` folder for each container. The reason for this is to ensure that the solution is stable.<br>

For example if you wanted to add a module onto the react container then you should do the following:

1. On local machine navigate to the `/client/sheapp` directory.
2. Run locally on your machine `npm install [package] --save`.
3. Run `docker-compose up` command again.
4. Git push and include the `node_modules` folder.
