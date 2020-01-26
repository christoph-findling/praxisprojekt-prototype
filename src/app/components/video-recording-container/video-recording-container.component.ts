import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RecordingService } from "src/app/services/recording-service.service";
import { StoreService } from "src/app/services/store-service.service";
import { Subscription, Observable } from "rxjs";
import { RecordedVideo } from "src/app/models/recorded-video.model";
import { LearningPath } from "src/app/models/learning-path.model";
import { defaultLearningPath } from "src/app/default-learning-path";
import { Step } from "src/app/models/step.model";
import { StoredVideo } from "src/app/models/stored-video.model";

@Component({
  selector: "app-video-recording-container",
  templateUrl: "./video-recording-container.component.html",
  styleUrls: ["./video-recording-container.component.sass"]
})
export class VideoRecordingContainerComponent implements OnInit {
  @ViewChild("video", { static: false }) video: ElementRef<HTMLVideoElement>;
  @ViewChild("videoPreview", { static: false }) videoPreview: ElementRef<
    HTMLVideoElement
  >;

  private currentLearningPath: LearningPath;
  private currentStepIndex: number;

  constructor(
    private recordingService: RecordingService,
    private storageService: StoreService
  ) {}

  ngOnInit() {
    this.startCamera();
    this.currentLearningPath = defaultLearningPath;
    this.currentStepIndex = 1;
  }

  get videoElement() {
    return this.video.nativeElement;
  }

  startRecording() {
    this.recordingService.startRecording();
  }

  async stopRecording() {
    try {
      const blob = (await this.recordingService.stopRecording()) as Blob;
      this.storeVideo(blob);
    } catch (err) {
      console.log(err);
    }
  }

  async storeVideo(blob: Blob) {
    const fileName = new Date().toISOString() + "_Katarakt.webm";
    const fileUrl = (await this.storageService.storeVideo({
      blob,
      fileName
    })) as string;

    const newVideo: StoredVideo = {
      path: fileUrl,
      fileName
    };
    // this.updateLearningPath(newVideo);
  }

  async updateLearningPath(newVideo: StoredVideo) {
    // make a deep copy of the current learningpath
    const updatedLearningPath: LearningPath = JSON.parse(
      JSON.stringify(this.currentLearningPath)
    );

    updatedLearningPath.steps[this.currentStepIndex].videos.push(newVideo);

    this.storageService.update(updatedLearningPath);
  }

  async startCamera() {
    if (navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        this.videoElement.srcObject = stream;
        this.videoElement.play();
      } catch (err) {
        console.log("error connecting to camera");
        console.log(err);
      }
    }
  }

  playVideo() {
    this.videoElement.play();
  }
}
