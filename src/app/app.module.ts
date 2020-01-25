import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RxSpeechRecognitionService, SpeechRecognitionModule } from '@kamiazya/ngx-speech-recognition';
import { AppComponent } from './app.component';
import { VideoContainerComponent } from './video-container/video-container.component';
import { LearningPathOverviewComponent } from './components/learning-path-overview/learning-path-overview.component';
import { LearningPathWriteComponent } from './components/learning-path-write/learning-path-write.component';
import { StepContainerComponent } from './components/step-container/step-container.component';
import { StepComponent } from './components/step/step.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoContainerComponent,
    LearningPathOverviewComponent,
    LearningPathWriteComponent,
    StepContainerComponent,
    StepComponent
  ],
  imports: [
    BrowserModule,
    SpeechRecognitionModule.withConfig({
      lang: 'de-de',
      continuous: true,
      interimResults: false,
      maxAlternatives: 1
    }),
  ],
  providers: [RxSpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
