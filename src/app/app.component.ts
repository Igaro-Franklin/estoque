import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabelaComponent } from "./tabela/tabela.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabelaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Estoque';
}
