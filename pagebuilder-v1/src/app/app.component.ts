import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebpageBuilderComponent } from './pages/webpage-builder/webpage-builder.component';
import { LeftNavComponent } from './pages/left-nav/left-nav.component';
import { TopNavComponent } from './pages/top-nav/top-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WebpageBuilderComponent, LeftNavComponent, TopNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pagebuilder-v1';
}
