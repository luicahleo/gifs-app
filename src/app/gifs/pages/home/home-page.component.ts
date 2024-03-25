import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'gifs-home-page',
    templateUrl: './home-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent { }
