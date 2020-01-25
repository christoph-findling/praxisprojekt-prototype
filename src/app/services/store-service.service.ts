import { LearningPath } from './../models/learning-path.model';
import { Injectable } from "@angular/core";
import { NgForage } from "ngforage";
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class StoreService {
  constructor(private readonly ngf: NgForage) {}

  getAll(): LearningPath[] {
    const learningPaths: LearningPath[] = [];
    this.onNgfReady(() => {
        this.ngf.iterate(
          (value, key) => learningPaths[key] = value
        );
    });
    return learningPaths;
  }

  update(learningPath: LearningPath) {
    this.onNgfReady(() => {
      this.ngf.setItem(learningPath.id.toString(), learningPath);
    });
  }

  create(learningPath: LearningPath) {
    learningPath.isDefault = false;
    return this.update(learningPath);
  }

  read(id: number): Observable<LearningPath> {
    return from(this.ngf.ready().then(() => {
      return this.ngf.getItem<LearningPath>(id.toString());
    }));
  }

  delete(id: number) {
    this.onNgfReady(() => {
      this.ngf.removeItem(id.toString());
    });
  }

  private onNgfReady(fn: () => void) {
    this.ngf.ready().then(() => fn());
  }
}
