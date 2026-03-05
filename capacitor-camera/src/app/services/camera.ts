import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { registerPlugin } from '@capacitor/core/types/global';

// 1. Define the interface so TypeScript knows what your plugin can do
export interface AiRecolorPlugin {
  recolorImage(options: { path: string, color: string }): Promise<{ recoloredImagePath: string }>;
}

// 2. Register the custom plugin
const AiRecolor = registerPlugin<AiRecolorPlugin>('AiRecolor');

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  
  async processAndRecolor(targetColor: string) {
    try {
      // Step A: Take the picture
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri, // Use Uri for better performance
        source: CameraSource.Camera,
      });

      if (photo.path) {
        // Step B: Send the path to your Kotlin Plugin
        const result = await AiRecolor.recolorImage({
          path: photo.path,
          color: targetColor // e.g., '#FF5733'
        });

        console.log('Recolored Image saved at:', result.recoloredImagePath);
        return result.recoloredImagePath;
      }
    } catch (error) {
      console.error('Processing failed', error);
    }
    return null;
  }
}
