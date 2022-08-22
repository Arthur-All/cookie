import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { listModel } from 'src/app/model/listModel';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class modalComponent implements OnInit {
  listFood: listModel;
  @Input() food?: listModel;
  @Output() foodUpdated = new EventEmitter<listModel[]>();
  constructor(private listService: ListService) { }

  ngOnInit() {
  }

  updateFood(food: listModel) {
    this.listService.updateList(food)
      .subscribe((foods: listModel[]) => this.foodUpdated.emit(foods));
  }
  createFood(food: listModel) {
    this.listService.createItem(food)
      .subscribe((foods: listModel[]) => this.foodUpdated.emit(foods));

  }
  deleteFood(food: listModel) {
    this.listService.deleteItem(food)
      .subscribe((foods: listModel[]) => this.foodUpdated.emit(foods));
  }

  refresh() {
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }
}
