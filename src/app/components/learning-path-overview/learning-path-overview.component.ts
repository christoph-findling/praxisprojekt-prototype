import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningPath } from 'src/app/models/learning-path.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StoreService } from 'src/app/services/store-service.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-learning-path-overview',
  templateUrl: './learning-path-overview.component.html',
  styleUrls: ['./learning-path-overview.component.sass']
})
export class LearningPathOverviewComponent implements OnInit {
  learningPaths$: Observable<LearningPath[]>;

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.learningPaths$ = this.store.getAll();
  }

}
