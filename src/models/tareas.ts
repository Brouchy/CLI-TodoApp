import { v4 as uuidv4 } from 'uuid';
import colors from 'colors';

 export interface Tarea {
    id: string;
    descripcion: string;
    completadoEn?:string |null ;
  }


export class Tareas{
    private _listado:Tarea[]=[];
   
    
  public get getListadoTareas():Tarea[]
  {
    return this._listado;
  }

   public crearTarea=(description:string):void=>{
    const nuevaTarea:Tarea={
        id:uuidv4(),
        descripcion:description,
        completadoEn:null
    }
    this._listado.push(nuevaTarea);
   }
  public cargarTareasFromArray(tareas:Tarea[]):void
  {
    this._listado=[...tareas];
  }
  private decorarListado(lista:Tarea[]):void{
    for (const [index,tarea] of lista.entries()) {
      const {descripcion,completadoEn}=tarea;
      const estado= completadoEn?colors.green(`${completadoEn}`):colors.red("Pendiente");
      console.log(`${colors.green(index+1+'.')} ${descripcion} :: ${estado}`)
    }
  }

  public listadoCompleto():void{
    {
      console.log();
      this.decorarListado(this.getListadoTareas)
    }
  }

  public listarPendientesCompletadas(completadas:boolean):void
  { 
    console.log();
    const tareasSegunEstado=this.getListadoTareas.filter(tarea=>!!tarea.completadoEn===completadas)
    this.decorarListado(tareasSegunEstado);
  }

  public borrarTarea(id:string):void{
    const listaFiltrada=this.getListadoTareas.filter(tareas=>tareas.id!==id);
    this._listado=[...listaFiltrada];
  }

  public toggleCompletadas(ids:string[]):void{
    for (const id of ids) {
        const tarea =this._listado.find(todo=>todo.id==id);
        if(tarea &&!tarea?.completadoEn){
          tarea.completadoEn = new Date().toISOString();
        }
    }
    for (const tarea of this.getListadoTareas) {
       if(!ids.includes(tarea.id)){
            tarea.completadoEn=null;
        }
    };
  }
  
}

