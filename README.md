# Mars Rover (JavaScript)

This is a project to move some Rovers over a plateau in Mars.

## Prerequisites

- [NodeJS](https://nodejs.dev/) (version 18)
- npm (version 8:15:0)
- [yarn](https://classic.yarnpkg.com/en/) (version 1.22.19)

## Endpoints

There is just one endpoint that receive a text file to process.

### File format

The file must be contain, at least, 3 lines. The first line of the file is the description of the `TOP` `RIGHT` corner of the plateau in Mars that the Rovers will walk over.
The second and third lines of the file are lines about the rover information. First line of Rover information is it possition, separeted by spaces. Ex.: `1 5 N`. Thats means the Rover are in position `X:1, Y:5` and facing to North.
And the last line of the Rover are the instructions to move the Rover. Possibles values are `L`, `R` and `M`. `L` and `R` are to rotate the Rover 90 degrees to left and right, respectively. The letter `M` is to move the Rover 1 position to it facing of.

#### Example file

```text
5 4
0 0 N
RMMMMLMMM
```

In this example, the plateau has 5x4 size, the initial position of the Rover are `X:0`, `Y:0` and faced `North`.
The last position of the Rover will be `4 3 N`, the `TOP` `Right` corner of the Plateau.

> **Important**
> The bottom left corner of the Plateau are `X:0` and `Y:0`

### Response

The response of the endpoint is a plaintext message that, each line is the result of each Rover.

Using the same example above, the result will be:

```
4 3 N
```
The Rover is on the `TOP` `RIGHT` corner of the Plateau.

## How to build and run

To run project localy, use this commands bellow.

```shell
$ yarn install
$ yarn dev
```

To run the unit tests of the project, we usin jest.

```shell
$ yarn test --coverage
```

Using `--coverage` is possible to see the coverage inside the project.

### Calling with cURL

Example using [cURL](https://curl.se/) to call.

```shell
$ curl -X 'POST' \
  -H 'Content-Type: multipart/form-data' \
  --form 'input=@nasa.txt' \
  'http://localhost:8080/explore'
```

The [nasa.txt](#example-file) file is the same that the example above.
