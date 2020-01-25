import { VideoContainerComponent } from "./video-container/video-container.component";
import { SpeechService } from "./speech.service";
import { Component, ViewChild, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnDestroy {
  @ViewChild(VideoContainerComponent, { static: false })
  videoContainer: VideoContainerComponent;
  private subscriptions: Subscription[] = [];

  constructor(private speechService: SpeechService) {
    this.speechService.start();
    this.listenToActions();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private listenToActions() {
    this.subscriptions.push(
      this.speechService.listen().subscribe(triggeredActions => {
        triggeredActions.forEach(triggeredAction =>
          this.videoContainer.triggerAction(triggeredAction)
        );
      })
    );
  }
}
