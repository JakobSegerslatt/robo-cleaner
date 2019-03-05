import { NgModule } from '@angular/core';

import {
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatInputModule,
        MatFormFieldModule,
    ]
})
export class MaterialModule { }
