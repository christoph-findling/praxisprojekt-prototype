import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RxSpeechRecognitionService, SpeechRecognitionModule } from '@kamiazya/ngx-speech-recognition';
import { AppComponent } from './app.component';
import { VideoContainerComponent } from './components/video-container/video-container.component';
import { LearningPathOverviewComponent } from './components/learning-path-overview/learning-path-overview.component';
import { LearningPathWriteComponent } from './components/learning-path-write/learning-path-write.component';
import { StepContainerComponent } from './components/step-container/step-container.component';
import { StepComponent } from './components/step/step.component';
import { NgForageModule } from 'ngforage';
import { VideoRecordingContainerComponent } from './components/video-recording-container/video-recording-container.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoContainerComponent,
    LearningPathOverviewComponent,
    LearningPathWriteComponent,
    StepContainerComponent,
    StepComponent,
    VideoRecordingContainerComponent
  ],
  imports: [
    BrowserModule,
    // Optional in Angular 6 and up
    NgForageModule.forRoot(),
    SpeechRecognitionModule.withConfig({
      lang: 'de-de',
      continuous: true,
      interimResults: true,
      maxAlternatives: 1
    }),
  ],
  providers: [RxSpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
