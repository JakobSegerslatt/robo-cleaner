import { Component, OnInit } from '@angular/core';
import { PositionService } from '../services/position.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  constructor(public posService: PositionService) { }

  ngOnInit() {
  }

  /** Safecheck the user input before triggering a rebuild of the tiles */
  public inputChanged(): void {
    if (Number.isNaN(this.posService.tileColumns) || this.posService.tileColumns === 0) {
      this.posService.tileColumns = 1;
    }
    if (Number.isNaN(this.posService.tileRows) || this.posService.tileRows === 0) {
      this.posService.tileRows = 1;
    }
    if (Number.isNaN(this.posService.moveSpeed) || this.posService.moveSpeed === 0) {
      this.posService.moveSpeed = 10;
    }
    this.posService.updateTiles.next();
  }
}
