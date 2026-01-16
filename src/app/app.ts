import { Component, signal } from '@angular/core';
import { Navbar } from "./Components/navbar/navbar";
import {  RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, // Explicitly mark as standalone if not already
  imports: [Navbar, RouterOutlet,HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My-app');
}