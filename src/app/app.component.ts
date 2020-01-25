import { defaultLearningPath } from './default-learning-path';
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
  }
}
