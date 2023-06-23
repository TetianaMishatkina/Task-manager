import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task-manager';
  public inputValue: string =''
  public taskList:{
    value: string,
    column: string
    id: number
  }[]= []

  ngOnInit() {
   const res= localStorage.getItem('item')
    if(res){
      this.taskList = JSON.parse(res)
    }
  }

  public handleClick(){
    const copy = [...this.taskList]
    copy.push({
      value: this.inputValue,
      column: 'todo',
      id: Math.random()
    })
    this.taskList = copy;
    this.inputValue = '';
    localStorage.setItem('item', JSON.stringify(this.taskList))
  }

  public inputChange(event:any){
    this.inputValue = event.target.value;
  }

}
