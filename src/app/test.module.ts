import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { TilesComponent } from './tiles/tiles.component';
import { StatsComponent } from './stats/stats.component';
import { DisplayTimePipe } from './pipes/display-time.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        TilesComponent,
        StatsComponent,
        DisplayTimePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        GridModule
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        GridModule,
        AppComponent,
        TilesComponent,
        StatsComponent,
        DisplayTimePipe,
    ]
})
export class TestModule { }
