import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'to-do-list',
  templateUrl: 'to-do-list.component.html',
  styleUrls: ['to-do-list.component.scss'],
})
export class ToDoListComponent implements OnChanges{

  @Input() public taskList:{
    value:string,
    column:string
    id:number
  }[] = []

  @Output() public taskListChange: EventEmitter<{
    value:string,
    column:string
    id:number
  }[]> = new EventEmitter<{value: string; column: string, id:number}[]>()

  public todo:{
    value: string,
    column:string
    id:number
  }[] = [];
  public inProgress:{
    value: string,
    column:string
    id:number
  }[] = [];
  public done:{
    value: string,
    column:string
    id:number
  }[] = [];
  public deleteClick(id:number){
    const copy = [...this.taskList].filter((item)=>{
      return item.id !== id
    })

    localStorage.setItem('item', JSON.stringify(copy))
    this.taskListChange.emit(copy)
  }

  ngOnChanges() {
    this.todo = this.taskList.filter((task)=>task.column ==='todo')
    this.inProgress = this.taskList.filter((task)=>task.column ==='inProgress')
    this.done = this.taskList.filter((task)=>task.column ==='done')
  }

  drop(event: CdkDragDrop<{
    value: string,
    column:string,
    id:number
  }[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
     const res = event.container.data.map((task)=>{
        return {
          value: task.value,
          column: event.container.id,
          id: task.id
        }
      });

     const mix = [...res, ...this.taskList]
      const uniqueArray = mix.filter((item, pos, mix)=>{
       const index= mix.findIndex((element)=>{
          return element.id === item.id
        })
        return index === pos;
      })
      localStorage.setItem('item', JSON.stringify(uniqueArray))
      this.taskListChange.emit(uniqueArray)
    }
  };
}
