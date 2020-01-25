import { Subscription } from 'rxjs';
import { SpeechService } from './../../services/speech.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { WhiteListedAction } from "../../models/white-listed-action.enum";

@Component({
  selector: "app-video-container",
  templateUrl: "./video-container.component.html",
  styleUrls: ["./video-container.component.sass"]
})
export class VideoContainerComponent implements OnInit, OnDestroy {
  @ViewChild("video", { static: false }) video: ElementRef<HTMLVideoElement>;
  sources = [
    "assets/videos/schulung_step1_x264.mp4",
    "assets/videos/schulung_step2_x264.mp4",
    "assets/videos/schulung_step3_x264.mp4",
    "assets/videos/schulung_step4_x264.mp4"
  ];
  activeSource = 0;
  playbackRate = 1;
  private subscriptions: Subscription[] = [];

  constructor(private speechService: SpeechService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.speechService.listen().subscribe(triggeredActions => {
        triggeredActions.forEach(triggeredAction =>
          this.triggerAction(triggeredAction)
        );
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get videoElement() {
    return this.video.nativeElement;
  }

  triggerAction(action: WhiteListedAction) {
    switch (action) {
      case WhiteListedAction.pause:
        this.pause();
        break;
      case WhiteListedAction.abspielen:
        this.play();
        break;
      case WhiteListedAction.langsamer:
        this.decreasePlaybackSpeed();
        break;
      case WhiteListedAction.schneller:
        this.increasePlaybackSpeed();
        break;
      case WhiteListedAction.weiter:
        this.nextVideo();
        break;
      case WhiteListedAction.zurück:
        this.previousVideo();
        break;
      case WhiteListedAction.start:
        break;
      case WhiteListedAction.stopp:
        this.pause();
        break;
      case WhiteListedAction.beenden:
        break;
    }
  }

  private pause() {
    this.videoElement.pause();
    console.log("paused");
  }
  private play() {
    this.videoElement.play();
    console.log("play");
  }
  private nextVideo() {
    if (this.activeSource === this.sources.length - 1) {
      this.activeSource = 0;
    } else {
      this.activeSource++;
    }
    console.log("nextVideo");
  }
  private previousVideo() {
    if (this.activeSource === 0) {
      this.activeSource = this.sources.length - 1;
    } else {
      this.activeSource--;
    }
    console.log("previousVideo");
  }

  private increasePlaybackSpeed() {
    this.playbackRate = this.playbackRate + 0.2;
    console.log("increasePlaybackSpeed");
  }

  private decreasePlaybackSpeed() {
    this.playbackRate = this.playbackRate - 0.2;
    console.log("decreasePlaybackSpeed");
  }

  private normalPlaybackSpeed() {
    this.playbackRate = 1;
    console.log("decreasePlaybackSpeed");
  }
}
