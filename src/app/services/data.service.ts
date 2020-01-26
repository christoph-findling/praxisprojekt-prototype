import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Step } from "../models/step.model";

// export enum Mode {
//   OVERVIEW = "overview",
//   LEARNING_PATH = "learning_path"
// }

export enum SidenavMode {
  SIDEBAR = "sidebar",
  TOOLS = "tools",
  INFORMATION = "information",
  COMPLICATIONS = "complications",
  HIDE = "hide"
}

@Injectable({
  providedIn: "root"
})
export class DataService {
  // mode$: BehaviorSubject<Mode> = new BehaviorSubject(Mode.OVERVIEW);
  currentStep$: Subject<Step> = new Subject();
  sidenavMode$: Subject<SidenavMode> = new Subject();

  constructor() {}

  setCurrentStep(step: Step) {
    this.currentStep$.next(step);
  }

  setSidenavMode(mode: SidenavMode) {
    this.sidenavMode$.next(mode);
  }

  toggleSidebar() {
    this.setSidenavMode(SidenavMode.HIDE);
  }

  showSidebar() {
    this.setSidenavMode(SidenavMode.SIDEBAR);
  }

  showTools() {
    this.setSidenavMode(SidenavMode.TOOLS);
  }

  showComplications() {
    this.setSidenavMode(SidenavMode.COMPLICATIONS);
  }

  showInformation() {
    this.setSidenavMode(SidenavMode.INFORMATION);
  }
}
