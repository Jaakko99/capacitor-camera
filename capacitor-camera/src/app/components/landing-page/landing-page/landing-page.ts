import { Component } from '@angular/core';
import { CameraService } from '../../../services/camera';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  
 photoData: string | null = null;

  constructor(private cameraService: CameraService) {}

  async takePhoto() {
    this.photoData = await this.cameraService.takePicture();
  }

  // Just skeleton to save it now, will be implemented to be saved to folder
  savePhoto() {
    if (!this.photoData) return;
    const link = document.createElement('a');
    link.href = this.photoData;
    link.download = 'photo.png';
    link.click();
  }

  detectAndChangeColor() {
    alert('AI plugin will go here!');
  }
}
