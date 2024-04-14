import { menuInquirer,
        pausa,leerInput, 
        mostrarListadosCheckList,
        listadoTareasBorrar,
        confirmar,

        }
         from "./helpers/inquirer.js";
import { Tarea, Tareas } from "./models/tareas.js";
import {guardarDB, leerDB} from "./helpers/guardarArchivo.js"


(async()=>{
    await main();
})();

async function main() {
    let opt:string;
    const tareas = new Tareas();
    const tareasDB:Tarea[]|null=leerDB();
    if(tareasDB)
        {
            tareas.cargarTareasFromArray(tareasDB);
        }
    do{
        opt= await menuInquirer();
        switch (opt) {
            case '1':  
            const desc= await leerInput('Descripcion:');
             tareas.crearTarea(desc);
                break;
        
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
              const ids=await mostrarListadosCheckList(tareas.getListadoTareas);
              tareas.toggleCompletadas(ids);
            break;
            case '6':
               const id=await listadoTareasBorrar(tareas.getListadoTareas);
               if(id!=='0'){
                const ok =await confirmar('¿Estas seguro?');
                if(ok){
                 tareas.borrarTarea(id);
                 console.log('Tarea Borrada'); 
                }
             }
             break;
        }
         guardarDB(tareas.getListadoTareas) 
        await pausa();
    }while(opt!=='0');
}
