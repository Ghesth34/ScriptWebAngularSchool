import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario'
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router} from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-form-usuario',
    templateUrl: './form-usuario.component.html',
    styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
    
    public user: Usuario = new Usuario;
    public confpws:string = "";
    public key:string;

    constructor(
        protected userService:UsuarioService,
        private activadRouter:ActivatedRoute,
        private router:Router
    )  {}
       
        ngOnInit(): void {
        this.user.ativo = true;
        this.key = this.activadRouter.snapshot.paramMap.get("key");
        if (this.key){
            this.userService.get(this.key).subscribe(
                res=>{
                    this.user = res;
                }
            )
        }
    }

    onsubmit(form){
        //console.log("Usuario:",this.user, "Formulario",form);
        if(form.invalid){
         alert("Dado Incorreto");
         } else {
             if (this.key){
                this.userService.update(this.user,this.key).subscribe(
                    res=>{
                     alert("ATUALIZADO");
                     this.user = new Usuario;
                     this.router.navigate([""]);
                    },
                    err=>{
                        alert("ERRO AO ATUALIZAR")
                    }
            )

             }else {
             this.userService.add(this.user).subscribe(
                 res=>{
                  alert("CADASTRADO")   
                  this.user = new Usuario;
                  this.router.navigate([""]);
                 },
                 err=>{
                     alert("ERRO AO CADASTRAR!")
                 }
         )
        }
         }
       }
    }