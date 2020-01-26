import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningPath } from 'src/app/models/learning-path.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StoreService } from 'src/app/services/store-service.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.sass']
})
export class LearningPathComponent implements OnInit {
  learningPath$: Observable<LearningPath>;

  constructor(private route: ActivatedRoute, private store: StoreService) { }

  ngOnInit() {
    this.learningPath$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.store.read(params.get('id')))
    );
  }
}
