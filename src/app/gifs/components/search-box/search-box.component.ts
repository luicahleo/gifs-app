import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'gifs-search-box',
    template: `<h5>Buscar:
    <input type="text" class="form-control" placeholder="Buscar GIFs...">
    </h5>`,

})
export class SearchBoxComponent { }
