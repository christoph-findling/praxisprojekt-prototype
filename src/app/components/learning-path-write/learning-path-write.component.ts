import { StoreService } from './../../services/store-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { LearningPath } from 'src/app/models/learning-path.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-learning-path-write',
  templateUrl: './learning-path-write.component.html',
  styleUrls: ['./learning-path-write.component.sass']
})
export class LearningPathWriteComponent implements OnInit {
  learningPath$: Observable<LearningPath>;

  constructor(private route: ActivatedRoute, private store: StoreService) { }

  ngOnInit() {
    this.learningPath$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.store.read(params.get('id')))
    );
  }

  update() {
    // this.store.update()
  }
}
