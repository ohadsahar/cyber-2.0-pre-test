import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CubeDataInterface } from '../Models/cubeinterface';

const backendUrl = environment.backendUrl;
@Injectable({providedIn: 'root' })
export class ShapeService {

  private cubes: CubeDataInterface [] = [];
  private UpdatedCubes = new Subject<CubeDataInterface[]>();
  constructor(private http: HttpClient) {}

  SaveCube(width: string, height: string, direction: string) {

    const cubeinfo = { width, height, direction};
    this.http.post(backendUrl + '/savedCubeData', cubeinfo).subscribe(result => {

    });
  }
  GetAllCubes() {

    this.http.get<{cubes: any}>(backendUrl + '/savedCubeData')
    .pipe(map((CubesDataResponse) => {
      return CubesDataResponse.cubes.map(cubedata => {
        return {
          id: cubedata.id,
          width: cubedata.width,
          height: cubedata.height,
          direction: cubedata.direction
        };
      });
    })).subscribe(transformedData => {
        this.cubes = transformedData;
        this.UpdatedCubes.next([...this.cubes]);

    });
  }

  GetAllCubesListener() {

    return this.UpdatedCubes.asObservable();
  }




}
