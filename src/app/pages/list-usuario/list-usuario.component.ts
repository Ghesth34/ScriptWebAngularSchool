import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  public users: Usuario[] = [];

  constructor(
    private userService: UsuarioService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.atualizaLista();
  }
  atualizaLista() {
    this.userService.getAll().subscribe(
      res => {
        this.users = res;
      }

    )
  }
 edit(id){
   console.log(id);
   this.router.navigate(["formUser", id]);
 }

 remove(id){
   if (confirm("Deseja apagar os dados?")){
   this.userService.remove(id).subscribe(
res =>{
  this.atualizaLista();
},
err=>{
  console.error(err);
  alert("Não foi possível apagar os dados...");
}

   );
   
   }
  }

}
