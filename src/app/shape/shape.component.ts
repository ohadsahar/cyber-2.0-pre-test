import { Component } from '@angular/core';
import { changedirection } from '../animations/animations';
import { NgForm } from '@angular/forms';
import { ShapeService } from '../services/shape.service';
import { CubeDataInterface } from '../Models/cubeinterface';
import { Subscription } from 'rxjs';

@Component({

  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css'],
  animations: [
    changedirection

  ],


})

export class ShapeComponent {

  constructor(private shapeservice: ShapeService) {}

  public currentDirection = 'front';
  public width = '200' + 'px';
  public height = '200' + 'px';
  public value = '100' + 'px';
  public temp = 0;
  public AllCubes: CubeDataInterface [] = [];
  public SubAllCubes: Subscription;

  ChangedDirection(directionchanged) {

    this.currentDirection = directionchanged;

  }


  ChangedDiminsionOfCube(form: NgForm) {

    if (form.invalid) {

      return;
    }


    this.width = form.value.cubewidth + 'px';
    this.height = form.value.cubeheight + 'px';
    this.temp = form.value.cubeheight / 2;
    this.value = this.temp + 'px';

    const translateZOne = document.getElementById('translateZOne');
    const translateZTwo = document.getElementById('translateZTwo');
    const translateZThree = document.getElementById('translateZThree');
    const translateZFour = document.getElementById('translateZFour');
    const translateZFive = document.getElementById('translateZFive');
    const translateZSix = document.getElementById('translateZSix');

    translateZOne.style.transform = 'rotateY(0deg) translateZ(' + this.value + ')';
    translateZTwo.style.transform = 'rotateY(90deg) translateZ(' + this.value + ')';
    translateZThree.style.transform = 'rotateY(180deg) translateZ(' + this.value + ')';
    translateZFour.style.transform = 'rotateY(-90deg) translateZ(' + this.value + ')';
    translateZFive.style.transform = 'rotateX(90deg) translateZ(' + this.value + ')';
    translateZSix.style.transform = 'rotateX(-90deg) translateZ(' + this.value + ')';

  }


  SaveCubeInfo() {


      this.shapeservice.SaveCube(this.width, this.height, this.currentDirection);

  }

  GetAllCubes() {

    this.shapeservice.GetAllCubes();
    this.SubAllCubes = this.shapeservice.GetAllCubesListener().subscribe(result => {

        this.AllCubes = result;

    });

  }



}
