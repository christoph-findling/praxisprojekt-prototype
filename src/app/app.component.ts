import {
  defaultLearningPath,
  defaultLearningPath2,
  defaultLearningPath3
} from "./default-learning-path";
import { StoreService } from "./services/store-service.service";
import { Component } from "@angular/core";
import { DataService, SidenavMode } from "./services/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  showSidebar = true;

  constructor(private store: StoreService, private dataService: DataService) {
    this.store.create(defaultLearningPath);
    this.store.create(defaultLearningPath2);
    this.store.create(defaultLearningPath3);

    this.dataService.sidenavMode$.subscribe(mode => {
      if (mode === SidenavMode.HIDE) {
        this.showSidebar = false;
      } else {
        this.showSidebar = true;
      }
    });
  }
}
