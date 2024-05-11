class DungeonGenerator {
    myRows;
    myCols;
    myInitialRow;
    myInitialCol;
    myDungeon;
    myRoomCode;
    myNoRoomCode;
    myDungeonFinal;

    constructor() {
        this.myRows = 3;
        this.myCols = 3;
        this.myInitialRow = Math.floor(this.myRows / 2);
        this.myInitialCol = Math.floor(this.myCols / 2);
        this.myDungeon = [];
        this.myRoomCode = '□'
        this.myNoRoomCode = '■'
        this.myDungeonFinal = [];

        this.createInitialDungeon(this.myRows, this.myCols);
        this.generate();
        this.convert();

    }

    getDungeon() {
        return this.myDungeonFinal;
    }

    convert() {
        let roomTemplates = [

            [
                ['□', '□', '□', '□', '□', '□', '□'],
                ['□', '□', '□', '□', '□', '□', '□'],
                ['□', '□', '□', '□', '□', '□', '□'],
                ['□', '□', '□', '□', '□', '□', '□'],
                ['□', '□', '□', '□', '□', '□', '□'],
                ['□', '□', '□', '□', '□', '□', '□'],
                ['□', '□', '□', '□', '□', '□', '□']
            ],

            // [
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□']
            // ],
            // [
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□', '□']
            // ],
            // [
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□'],
            //     ['□', '□', '□', '□', '□', '□', '□', '□', '□']
            // ]
        ]

        for (let a = 0; a < this.myDungeon.length; a++) {
            for (let b = 0; b < this.myDungeon[0].length; b++) {
                let currentRoom = null;
                if (this.myDungeon[a][b] === this.myRoomCode) {
                    currentRoom = new Room(random(roomTemplates));
                    this.myDungeonFinal[a][b] = currentRoom;

                }
            }
        }
        this.generateDoors();
        for (let a = 0; a < this.myDungeonFinal.length; a++) {
            for (let b = 0; b < this.myDungeonFinal[0].length; b++) {
                if (this.myDungeonFinal[a][b] instanceof Room) {
                    this.myDungeonFinal[a][b].createDoors();
                    console.log(`Room at (${a}, ${b}):`, this.myDungeonFinal[a][b]);
                }
            }
        }
    }
    generateDoors() {
        for (let i = 0; i < this.myDungeonFinal.length; i++) {
            for (let j = 0; j < this.myDungeonFinal[0].length; j++) {
                let room = this.myDungeonFinal[i][j];

                if (room instanceof Room) {
                    // Check if there is a room to the north
                    if (i > 0 && this.myDungeonFinal[i - 1][j] !== null && this.myDungeonFinal[i - 1][j] instanceof Room) {
                        room.setNorthDoor();
                    }
                    // Check if there is a room to the south
                    if (i < this.myDungeonFinal.length - 1 && this.myDungeonFinal[i + 1][j] !== null && this.myDungeonFinal[i + 1][j] instanceof Room) {
                        room.setSouthDoor();
                    }
                    // Check if there is a room to the east
                    if (j < this.myDungeonFinal[0].length - 1 && this.myDungeonFinal[i][j + 1] !== null && this.myDungeonFinal[i][j + 1] instanceof Room) {
                        room.setRightDoor();
                    }
                    // Check if there is a room to the west
                    if (j > 0 && this.myDungeonFinal[i][j - 1] !== null && this.myDungeonFinal[i][j - 1] instanceof Room) {
                        room.setLeftDoor();
                    }
                }
            }
        }
    }



    createInitialDungeon(theRows, theCols) {
        for (let i = 0; i < theRows; i++) {
            let row = [];
            let rowFinal = [];
            for (let j = 0; j < theCols; j++) {
                row.push(this.myNoRoomCode);
                rowFinal.push(null);
            }
            this.myDungeon.push(row);
            this.myDungeonFinal.push(rowFinal);
        }

        this.myDungeon[this.myInitialRow][this.myInitialCol] = this.myRoomCode;
        console.log(this.myDungeon);
        console.log(this.myDungeonFinal);
    }

    isWithinBounds(theRow, col) {
        return theRow >= 0 && theRow < this.myRows && col >= 0 && col < this.myCols;
    }

    hasNoValidDirection(row, col) {
        return (
            (row - 1 < 0 || this.myDungeon[row - 1][col] !== this.myNoRoomCode) &&
            (row + 1 >= this.myRows || this.myDungeon[row + 1][col] !== this.myNoRoomCode) &&
            (col - 1 < 0 || this.myDungeon[row][col - 1] !== this.myNoRoomCode) &&
            (col + 1 >= this.myCols || this.myDungeon[row][col + 1] !== this.myNoRoomCode)
        );
    }


    generate() {

        while (this.myDungeon[this.myInitialRow + 1][this.myInitialCol] === this.myNoRoomCode ||
            this.myDungeon[this.myInitialRow - 1][this.myInitialCol] === this.myNoRoomCode ||
            this.myDungeon[this.myInitialRow][this.myInitialCol + 1] === this.myNoRoomCode ||
            this.myDungeon[this.myInitialRow][this.myInitialCol - 1] === this.myNoRoomCode) {
            console.log('restarting from the initial position');
            let maxRoomsInOneDirection = 5;
            let rowPos = Math.floor(this.myRows / 2);
            let colPos = Math.floor(this.myCols / 2);

            while (maxRoomsInOneDirection > 0) {
                let direction = Math.floor(random(0, 4));
                let newRowPos = rowPos;
                let newColPos = colPos;

                if (direction === 0) {
                    newRowPos = rowPos - 1;
                    console.log('up');
                } else if (direction === 1) {
                    newRowPos = rowPos + 1;
                    console.log('down');
                } else if (direction === 2) {
                    newColPos = colPos + 1;
                    console.log('right');
                } else if (direction === 3) {
                    newColPos = colPos - 1;
                    console.log('left');
                }

                // check that the new room location is within bounds, and that it is not already a room
                if (this.isWithinBounds(newRowPos, newColPos) && this.myDungeon[newRowPos][newColPos] === this.myNoRoomCode) {
                    rowPos = newRowPos;
                    colPos = newColPos;
                    this.myDungeon[rowPos][colPos] = this.myRoomCode;
                    maxRoomsInOneDirection--;
                    console.log(this.myDungeon);
                }

                if (this.hasNoValidDirection(rowPos, colPos)) {
                    console.log('no valid direction, break')
                    break;
                }
            }
        }
    }

}

class Room {
    myNorthDoor;
    mySouthDoor;
    myRightDoor;
    myLeftDoor;
    myTileMap;
    myEntityLocations;
    myDoorLocations;
    myEntityMap;

    constructor(theTileMap) {
        this.seed = random(-8192, 8192)
        this.myNorthDoor = false;
        this.mySouthDoor = false;
        this.myRightDoor = false;
        this.myLeftDoor = false;
        this.myTileMap = theTileMap;

        this.createDoorLocations();
        this.createEntityLocations();
        this.createEntityMap();

        this.createBottomWall();
        this.createTopWall();
        this.createLeftWall();
        this.createRightWall();
        this.createCorners();
    }

    getIsCollideDoor(thePlayerPos) {
        let bool = [this.myNorthDoor, this.mySouthDoor, this.myRightDoor, this.myLeftDoor]
        let tile = this.myTileMap[thePlayerPos[1]][thePlayerPos[0]]
        if (tile === '▲') {
            return 'north'
        }
        // South door
        if (tile === '▼') {
            return 'south'
        }

        // Right door
        if (tile === '▶') {
            return 'east'
        }

        // Left door
        if (tile === '◀') {
            return 'west'
        }
        // for (let a = 0; a < this.myDoorLocations.length; a++) {
        //     console.log(bool[a])
        //     if (thePlayerPos[1] == this.myDoorLocations[a][0] && thePlayerPos[0] == this.myDoorLocations[a][1] && bool[a]) {
        //         return true
        //     }
        // }
        return null
    }

    getNorthTeleportLocation() {
        return [this.myDoorLocations[0][0] + 1, this.myDoorLocations[0][1]];
    }

    getSouthTeleportLocation() {
        return [this.myDoorLocations[1][0] - 1, this.myDoorLocations[1][1]];
    }

    getEastTeleportLocation() {
        return [this.myDoorLocations[2][0], this.myDoorLocations[2][1] - 1];
    }

    getWestTeleportLocation() {
        return [this.myDoorLocations[3][0], this.myDoorLocations[3][1] + 1];
    }

    setNorthDoor() {
        this.myNorthDoor = true;
    }
    setSouthDoor() {
        this.mySouthDoor = true;
    }
    setRightDoor() {
        this.myRightDoor = true;
    }
    setLeftDoor() {
        this.myLeftDoor = true;
    }

    //TODO - I think the else statements are a band-aid fix for something wrong wherever createDoors() is called.
    createDoors() {
        // North door
        if (this.myNorthDoor) {
            this.myTileMap[this.myDoorLocations[0][0]][this.myDoorLocations[0][1]] = '▲';
        // } else {
        //      this.myTileMap[this.myDoorLocations[0][0]][this.myDoorLocations[0][1]] = '‾';
        }

        // South door
        if (this.mySouthDoor) {
            this.myTileMap[this.myDoorLocations[1][0]][this.myDoorLocations[1][1]] = '▼';
        // } else {
        //     this.myTileMap[this.myDoorLocations[1][0]][this.myDoorLocations[1][1]] = '_';
        }

        // Right door
        if (this.myRightDoor) {
            this.myTileMap[this.myDoorLocations[2][0]][this.myDoorLocations[2][1]] = '▶';
        // } else {
        //     this.myTileMap[this.myDoorLocations[2][0]][this.myDoorLocations[2][1]] = WORLD.WALL_RIGHT;
        }

        // Left door
        if (this.myLeftDoor) {
            this.myTileMap[this.myDoorLocations[3][0]][this.myDoorLocations[3][1]] = '◀';
        // } else {
        //     this.myTileMap[this.myDoorLocations[3][0]][this.myDoorLocations[3][1]] = WORLD.WALL_LEFT;
        }
    }


    createCorners() {
        this.myTileMap[0][0] = '⌜';
        this.myTileMap[0][this.myTileMap[0].length - 1] = '⌝';
        this.myTileMap[this.myTileMap.length - 1][0] = '⌞';
        this.myTileMap[this.myTileMap.length - 1][this.myTileMap[0].length - 1] = '⌟';
    }

    createTopWall() {
        for (let j = 0; j < this.myTileMap[0].length - 1; j++) {
            this.myTileMap[0][j] = '‾';
        }
    }

    createBottomWall() {
        for (let j = 0; j < this.myTileMap[0].length - 1; j++) {
            this.myTileMap[this.myTileMap.length - 1][j] = '_';
        }
    }

    createLeftWall() {
        for (let i = 0; i < this.myTileMap.length; i++) {
            this.myTileMap[i][0] = WORLD.WALL_LEFT;
        }
    }

    createRightWall() {
        for (let i = 0; i < this.myTileMap.length; i++) {
            this.myTileMap[i][this.myTileMap[0].length - 1] = WORLD.WALL_RIGHT;
        }
    }

    createDoorLocations() {
        this.myDoorLocations = [
            [0, Math.floor(this.myTileMap[0].length / 2)], // north
            [this.myTileMap.length - 1, Math.floor(this.myTileMap[0].length / 2)], // south
            [Math.floor(this.myTileMap.length / 2), this.myTileMap[0].length - 1], // right
            [Math.floor(this.myTileMap.length / 2), 0] // left
        ];
    }

    createEntityMap() {
        this.myEntityMap = [];
        for (let i = 0; i < this.myTileMap.length; i++) {
            let row = [];
            for (let j = 0; j < this.myTileMap[0].length; j++) {
                let isEntity = false;
                for (let k = 0; k < this.myEntityLocations.length; k++) {
                    const [x, y] = this.myEntityLocations[k];
                    if (x === i && y === j) {
                        isEntity = true;
                        break;
                    }
                }
                if (isEntity) {
                    // If any coordinate pair matches, mark 'X'
                    row.push('X');
                } else {
                    // If no match found, mark '□'
                    row.push('□');
                }
            }
            this.myEntityMap.push(row);
        }
    }

    createEntityLocations() {
        this.myEntityLocations = [];
        for (let i = 1; i < this.myTileMap.length - 1; i++) {
            for (let j = 1; j < this.myTileMap[0].length - 1; j++) {
                if (!(i === this.getNorthTeleportLocation()[0] && j === this.getNorthTeleportLocation()[1] ||
                    i === this.getSouthTeleportLocation()[0] && j === this.getSouthTeleportLocation()[1] ||
                    i === this.getEastTeleportLocation()[0] && j === this.getEastTeleportLocation()[1] ||
                    i === this.getWestTeleportLocation()[0] && j === this.getWestTeleportLocation()[1])) {
                    this.myEntityLocations.push([i, j]);
                }
            }
        }
    }

    getTileMap() {
        return this.myTileMap
    }
}
