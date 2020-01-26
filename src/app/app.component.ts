import { defaultLearningPath, defaultLearningPath2, defaultLearningPath3 } from './default-learning-path';
import { StoreService } from './services/store-service.service';
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  constructor(private store: StoreService) {
    this.store.create(defaultLearningPath);
    this.store.create(defaultLearningPath2);
    this.store.create(defaultLearningPath3);
  }
}
