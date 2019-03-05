import { Injectable } from '@angular/core';
import { timer, Subscription, BehaviorSubject, Subject } from 'rxjs';
import { Timer } from 'papilion';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  /** Whether oor not the robot has started moving */
  public isStarted: boolean;
  /** Whether oor not the robot is currently moving and time is ticking */
  public isMoving: boolean;
  /** Has all tiles been cleaned? */
  public isFinished: boolean;

  /** How many tiles should be displayed? */
  public tileColumns = 10;
  public tileRows = 10;
  /** Movement speed of the robot (in ms) */
  public moveSpeed = 500;
  /** Column position for the robot */
  public roboColumn = 0;
  /** Row position for the robot */
  public roboRow = 0;

  /** Elapsed time in seconds of the current cleaning session */
  public elapsedTime = 0;
  /** Timer for the elapsed time */
  private elapsedTimer: Timer;

  /** Subscription for the timer repsonsible for trigger new robot moves  */
  private moveTimerSub: Subscription;

  /** Triggers every time the robot should move */
  public moveRobot = new Subject<void>();

  /** Triggers every time the tiles should be marked dirty */
  public resetTiles = new Subject<void>();

  /** Triggers every time the amount tile columns/rows should be reset */
  public updateTiles = new Subject<void>();
  constructor() { }

  /**
   * Reset the current cleaning session by;
   * * Setting elapsedTime and remaingTime to 0,
   * * Stopping the robot cleaner.
   * * Marking all the tiles as dirty.
   */
  public reset(): void {
    this.stop();
    this.isStarted = false;
    this.isFinished = false;
    this.elapsedTime = 0;
    this.roboColumn = 0;
    this.roboRow = 0;
    this.resetTiles.next();
  }

  /** Set random start position */
  resetPosition(): any {
    this.roboColumn = Math.floor(Math.random() * this.tileColumns) + 1;
    this.roboRow = Math.floor(Math.random() * this.tileRows) + 1;
  }

  /**
   * Starts the cleaning by setting a random position for the cleaner.
   * Starts a timer which moves the position every 500ms (based on moveSpeed)
   */
  public start(): void {
    if (!this.isStarted) {
      this.resetPosition();
    }

    this.startElapsedTimer();

    this.startMoving();

    this.isStarted = true;
    this.isMoving = true;
  }

  /** Starts a timer for the elapsed time for this cleaning session */
  startElapsedTimer(): any {
    this.elapsedTimer = new Timer(() => {
      this.elapsedTime++;
    }, 1000);
  }

  /** Starts a timer for the robot movements */
  startMoving(): any {
    this.moveTimerSub = timer(this.moveSpeed, this.moveSpeed)
      .subscribe(_ => {
        this.moveRobot.next();
      });
  }

  /**
   * Simply stops the current moving and elapsed timers
   */
  public stop(): void {
    this.moveTimerSub.unsubscribe();
    this.elapsedTimer.stop();
    this.isMoving = false;
  }
}
