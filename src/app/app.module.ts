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
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LearningPathComponent } from './components/learning-path/learning-path.component';

const appRoutes: Routes = [
  { path: 'learning-path/:id', component: LearningPathComponent },
  { path: 'learning-path/edit/:id', component: LearningPathWriteComponent },
  {
    path: 'learning-paths',
    component: LearningPathOverviewComponent
  },
  { path: '',
    redirectTo: '/learning-paths',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/learning-paths',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    VideoContainerComponent,
    LearningPathOverviewComponent,
    LearningPathWriteComponent,
    StepContainerComponent,
    StepComponent,
    VideoRecordingContainerComponent,
    LearningPathComponent
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
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  providers: [RxSpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
