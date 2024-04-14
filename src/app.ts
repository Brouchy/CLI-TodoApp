// import inquirer, { Answers } from "inquirer";
// import { QuestionCollection } from "inquirer";

// const questions: QuestionCollection = [
//   {
//     type: 'checkbox',
//     name: 'toppings',
//     message: 'Selecciona tus toppings favoritos:',
//     choices: [
//       { name: 'Pepperoni', value: 'pepperoni' },
//       { name: 'Salchicha italiana', value: 'sausage' },
//       { name: 'Pimientos verdes', value: 'peppers' },
//       { name: 'Hongos', value: 'mushrooms' },
//       { name: 'Aceitunas negras', value: 'olives' },
//     ],
//   },
// ];

// inquirer.prompt(questions).then((answers: Answers) => {
//   const selectedToppings = answers.toppings;
//   console.log('Seleccionaste los siguientes toppings: ', selectedToppings);

//   // Puedes utilizar los toppings seleccionados para realizar alguna acción
//   // en tu programa, por ejemplo, mostrar un mensaje personalizado al usuario.
// });


import { menuInquirer,
        pausa,leerInput, 
        mostrarListadosCheckList,
        listadoTareasBorrar,
        confirmar,

        }
         from "./helpers/inquirer.js";
import { Tarea, Tareas } from "./models/tareas.js";
import {guardarDB, leerDB} from "./helpers/guardarArchivo.js"


console.clear();
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
