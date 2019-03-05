import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { getRandomEntry } from 'papilion';

import { PositionService } from '../services/position.service';
import { Tile } from './tile';

enum Direction {
  North = 'North',
  South = 'South',
  West = 'West',
  East = 'East',
}

const Directions = [Direction.North, Direction.South, Direction.West, Direction.East];

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {
  /** All the tiles displayed on the board */
  public tiles: Tile[];
  /** Generated grid styles for the board */
  public tileBoardStyles: { [key: string]: string; };

  constructor(public posService: PositionService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.tiles = this.initTiles(this.posService.tileColumns, this.posService.tileRows);
    this.tileBoardStyles = this.initTileBoardStyles(this.posService.tileColumns, this.posService.tileRows);

    this.posService.moveRobot.subscribe(() => {
      // Clean the first tile we're on
      this.cleanCurrentTile();
      this.moveRobot();
    });
    this.posService.resetTiles.subscribe(() => this.reset());

    this.posService.updateTiles.subscribe(() => {
      this.tiles = this.initTiles(this.posService.tileColumns, this.posService.tileRows);
      this.tileBoardStyles = this.initTileBoardStyles(this.posService.tileColumns, this.posService.tileRows);
    });
  }

  /** Cleans the tile the robot is currently on */
  private cleanCurrentTile(): void {
    const tile = this.tiles.find(t =>
      t.column === this.posService.roboColumn
      && t.row === this.posService.roboRow);
    tile.clean = true;
  }

  /**
   * Moves the column by changing either
   * column or row poosition by 1 point.
   * Marks the the position as cleaned
   */
  private moveRobot() {
    const moveDirection = getRandomEntry(Directions);

    switch (moveDirection) {
      case Direction.North:
        // Safecheck if we can move north, otherwise try again
        if (this.posService.roboRow > 1) {
          this.posService.roboRow--;
        } else {
          this.moveRobot();
        }
        break;
      case Direction.South:
        // Safecheck if we can move south, otherwise try again
        if (this.posService.roboRow < this.posService.tileRows) {
          this.posService.roboRow++;
        } else {
          this.moveRobot();
        }
        break;
      case Direction.West:
        // Safecheck if we can move west, otherwise try again
        if (this.posService.roboColumn > 1) {
          this.posService.roboColumn--;
        } else {
          this.moveRobot();
        }
        break;
      case Direction.East:
        // Safecheck if we can move east, otherwise try again
        if (this.posService.roboColumn < this.posService.tileColumns) {
          this.posService.roboColumn++;
        } else {
          this.moveRobot();
        }
        break;
    }

    this.cleanCurrentTile();

    this.checkIfDone();
  }

  checkIfDone(): void {
    if (this.tiles.every(t => t.clean)) {
      this.posService.stop();
      this.posService.isFinished = true;
    }
  }

  /**
   * @returns Grid template styles for the tileboard
   * @param columns Grid columns to generate
   * @param rows Grid rows to generate
   */
  private initTileBoardStyles(columns: number, rows: number): { [key: string]: string; } {
    return {
      'grid-template-columns': `repeat(${columns}, 1fr)`,
      'grid-template-rows': `repeat(${rows}, 1fr)`,
    };
  }

  /**
   * Returns an array of (dirty) tiles
   * @param columns - The amount of tiles columns
   * @param rows - The amount of tiles rows
   */
  private initTiles(columns: number, rows: number): Tile[] {
    const emptyColumns = Array.from({ length: columns });
    const emptyRows = Array.from({ length: rows });

    const tiles: Tile[] = [];
    emptyColumns
      .forEach((c, columnIndex) => {
        emptyRows.forEach((r, rowIndex) => {
          tiles.push({
            column: columnIndex + 1,
            row: rowIndex + 1,
            clean: false,
          });
        });
      });

    return tiles;
  }

  /** Sets the clean property on all tiles to false */
  private reset(): any {
    this.tiles.forEach(t => t.clean = false);
  }


  public get stylesForRobot(): { [key: string]: string; } {
    return {
      'grid-column-start': `${this.posService.roboColumn}`,
      'grid-row-start': `${this.posService.roboRow}`,
    };
  }

  public stylesForTile(tile: Tile): { [key: string]: string; } {
    return {
      'grid-column-start': `${tile.column}`,
      'grid-row-start': `${tile.row}`,
    };
  }
}
