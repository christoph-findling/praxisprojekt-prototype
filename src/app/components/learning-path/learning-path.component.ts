import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { LearningPath } from "src/app/models/learning-path.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { StoreService } from "src/app/services/store-service.service";
import { switchMap } from "rxjs/operators";
import { ActionType } from "src/app/models/action-type.enum";
import { DataService, SidenavMode } from "src/app/services/data.service";
import { Step } from "src/app/models/step.model";
import { SpeechService } from "src/app/services/speech.service";
import { WhiteListedAction } from "src/app/models/white-listed-action.enum";
import { NavigationService } from "src/app/services/navigation.service";
import { VideoContainerComponent } from "../video-container/video-container.component";
import { VideoRecordingContainerComponent } from "../video-recording-container/video-recording-container.component";

enum State {
  INSTRUCTION = "instruction",
  VIDEO = "video"
}

@Component({
  selector: "app-learning-path",
  templateUrl: "./learning-path.component.html",
  styleUrls: ["./learning-path.component.sass"]
})
export class LearningPathComponent implements OnInit, OnDestroy {
  @ViewChild(VideoContainerComponent, { static: false })
  videoContainer: VideoContainerComponent;
  @ViewChild(VideoRecordingContainerComponent, { static: false })
  recordingContainer: VideoRecordingContainerComponent;
  learningPath$: Observable<LearningPath>;
  type: ActionType = ActionType.TRAINING;
  finished = false;
  videoSource: string;
  private subscriptions: Subscription[] = [];
  currentStepIndex = 0;
  private steps: Step[] = [];
  private state: State;
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private dataService: DataService,
    private speechService: SpeechService,
    private navigationService: NavigationService
  ) {}

  get isTraining() {
    return this.type === ActionType.TRAINING;
  }

  get isLearning() {
    return this.type === ActionType.LEARNING;
  }

  get isStateInstruction() {
    return this.state === State.INSTRUCTION;
  }

  get isStateVideo() {
    return this.state === State.VIDEO;
  }

  get currentStep() {
    return this.steps[this.currentStepIndex];
  }

  get lastVideoForCurrentStep() {
    return this.currentStep.videos[this.currentStep.videos.length - 1];
  }

  ngOnInit() {
    this.learningPath$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.type = params.get("type") as ActionType;
        return this.store.read(params.get("id"));
      })
    );
    this.subscriptions.push(
      this.learningPath$.subscribe(learningPath => {
        if (!learningPath || !learningPath.steps || !learningPath.steps[0]) {
          throw new Error("Learning path doesn't have any steps!");
        }
        this.steps = learningPath.steps;
        setTimeout(() => {
          console.log("start step");
          this.isLoaded = true;
          this.startStep();
        }, 500);
      })
    );

    this.speechService.start();

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
    this.dataService.setSidenavMode(SidenavMode.HIDE);
  }

  onVideoComplete() {
    if (!this.isStateInstruction) {
      return;
    }
    this.state = State.VIDEO;
    if (this.isLearning) {
      this.videoSource = this.lastVideoForCurrentStep.path;
    } else {
      // this.recordingContainer.startRecording();
    }
  }

  changeStep(step: Step) {
    const stepIndex = this.steps.findIndex(
      stepIterator => stepIterator.id === step.id
    );
    this.currentStepIndex =
      stepIndex !== -1 ? stepIndex : this.currentStepIndex;
    this.startStep();
  }

  private startStep() {
    this.updateDataService(this.steps[this.currentStepIndex]);
    if (this.recordingContainer && this.recordingContainer.isRecording) {
      console.log("stop recording");
      this.recordingContainer.stopRecording();
      this.startInstructionSequence();
    } else {
      console.log("start instruction sequence");
      this.startInstructionSequence();
    }
  }

  private startInstructionSequence() {
    this.state = State.INSTRUCTION;
    this.videoSource = this.currentStep.instructionVideoSource;
    // setTimeout(() => {
    //   this.videoContainer.play();
    // }, 500);
  }

  private updateDataService(step: Step) {
    this.dataService.setCurrentStep(step);
  }

  // Speech service actions
  triggerAction(action: WhiteListedAction) {
    switch (action) {
      case WhiteListedAction.weiter:
        console.log("executing weiter");
        this.nextStep();
        break;
      case WhiteListedAction.zurück:
        console.log("executing zurück");
        this.previousStep();
        break;
      case WhiteListedAction.beenden:
        console.log("executing beenden");
        this.end();
        break;
      case WhiteListedAction.seitenleiste:
        console.log("executing seitenleiste");
        this.toggleSidebar();
        break;
      case WhiteListedAction.anleitung:
        console.log("executing anleitung");
        this.showSidebar();
        break;
      case WhiteListedAction.informationen:
        console.log("executing informationen");
        this.showInformation();
        break;
      case WhiteListedAction.komplikationen:
        console.log("executing komplikationen");
        this.showComplications();
        break;
      case WhiteListedAction.werkzeuge:
        console.log("executing werkzeuge");
        this.showTools();
        break;
      case WhiteListedAction.wiederholen:
        console.log("executing wiederholen");
        this.resetCurrentStep();
        break;
    }
  }

  private toggleSidebar() {
    this.dataService.toggleSidebar();
  }
  private showSidebar() {
    this.dataService.showSidebar();
  }
  private showTools() {
    this.dataService.showTools();
  }
  private showComplications() {
    this.dataService.showComplications();
  }
  private showInformation() {
    this.dataService.showInformation();
  }

  private async nextStep() {
    if (this.isTraining && this.isStateInstruction) {
      this.state = State.VIDEO;
      await this.recordingContainer.startCamera();
      this.recordingContainer.startRecording();
    } else {
      if (this.currentStepIndex === this.steps.length - 1) {
        if (this.recordingContainer.isRecording) {
          this.recordingContainer.stopRecording();
        }
        this.finished = true;
        return;
      }
      this.currentStepIndex++;
      this.startStep();
    }
  }

  private previousStep() {
    if (this.currentStepIndex === 0) {
      return;
    }
    this.currentStepIndex--;
    this.startStep();
  }

  private end() {
    this.navigationService.getOverviewPage();
  }

  private resetCurrentStep() {
    this.startStep();
  }
}
