# Mars Rover (JavaScript)

This is a project to move some Rovers over a plateau in Mars.

## Endpoints

There is just one endpoint, that receive a text file to process.

### File format

The file must be contain, at least, 3 lines. The first line of the file is the description of the `TOP` `RIGHT` corner of the plateau in Mars that the Rovers will walk over.
The second and third lines of the file are lines about the rover information. First line of Rover information is it possition, separeted by spaces. Ex.: `1 5 N`. Tahs means the Rover are in position X 1, Y 5 and facing to North.
And the last line of Rover are the instructions to move the Rover. Possibles values are `L`, `R` and `M`. `L` and `R` are to rotate the Rover 90 degrees to left or right, respectively. The letter `M` is to move the Rover 1 position to it facing of.

## How to build and run

### DEV build

To run as a development mode, use this commands bellow.

```shell
$ yarn install
$ yarn dev
```

To run the unit tests of the project, we usin jest.

```shell
$ yarn test --coverage
```

Using `--coverage` is possible to see the coverage inside the project.

### Prodution

To run the project as a production mode, we are using Docker.
To build docker to run as a production, use this commands:
```shell
```
