import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'todoapp';
  notes:any=[]
  readonly APIUrl="http://localhost:8000/api/v1/todo/"

  currentTask = {
    id: '',
    name: '',
    description: ''
  };

  isEditMode = false;

  constructor(private _http:HttpClient){
  }

  getNotes(){
    this._http.get(this.APIUrl+'getAll').subscribe((data:any)=>{

      if(data){
        this.notes=data['data']
      }
      console.log(data)
    })
  }

  onAddNotes(){
    var noteId=(<HTMLInputElement>document.getElementById('noteId')).value
    var noteName=(<HTMLInputElement>document.getElementById('noteName')).value
    var noteDescription=(<HTMLInputElement>document.getElementById('noteDescription')).value

    let payLoad={
      id:noteId,
      name:noteName,
      description:noteDescription,
      createdBy:'Ajit'
    }

    this._http.post(this.APIUrl+'create',payLoad).subscribe((data:any)=>{
      alert(data.message)
      this.getNotes();
    })

  }

  fillUpdateValue(note:any){
      this.isEditMode=true

      this.currentTask.id=note.id
      this.currentTask.name=note.name
      this.currentTask.description=note.description


  }

  onUpdate(id:any){
    var noteName=(<HTMLInputElement>document.getElementById('noteName')).value
    var noteDescription=(<HTMLInputElement>document.getElementById('noteDescription')).value

    let payLoad={
      name:noteName,
      description:noteDescription,
      //createdBy:'Ajit'
    }

      this._http.patch(this.APIUrl+`updateById/${id}`,payLoad).subscribe((data:any)=>{
        alert(data.message)
        this.resetForm();
        this.getNotes();
      })
  }
  onDelete(id:any){

    this._http.delete(this.APIUrl+`deleteById/${id}`).subscribe((data:any)=>{
      alert(data.message)
      this.getNotes();
    })
  }

  resetForm() {
    this.currentTask = { id: '', name: '', description: '' };
    this.isEditMode = false;
  }

  ngOnInit(): void {
    this.getNotes();
  }

}
