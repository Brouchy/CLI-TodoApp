import colors from "colors";
import inquirer, { Answers } from "inquirer";
import { Tarea } from "../models/tareas.js";


const preguntas=[
    {
        type:'list',
        name:'opcion',
        message:'Qué desea hacer?',
        choices:[
            {
                value:'1',
                name:`${colors.green('1')}. Crear tarea`
            },
            {
                value:'2',
                name:`${colors.green('2')}. Listar tareas`
            },
            {
                value:'3',
                name:`${colors.green('3')}. Listar tareas completadas`
            },
            {
                value:'4',
                name:`${colors.green('4')}. Listar tareas pendientes`
            },
            {
                value:'5',
                name:`${colors.green('5')}. Completar tarea(s)`
            },
            {
                value:'6',
                name:`${colors.green('6')}. Borrar tarea`
            },
            {
                value:'0',
                name:`${colors.green('0')}. Salir`
            },
        ]
    }
]

export const menuInquirer=async()=>{
    console.clear();
    console.log(colors.green("==========================="));
    console.log(colors.white("   Seleccione una opción   "));
    console.log(colors.green("===========================\n"));

    const {opcion}= await inquirer.prompt(preguntas);
    return opcion;
}

export const pausa =async()=>{
    const question=[
        {
            type:'input',
            name:'enter',
            message:`Precione ${colors.green('enter')} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
}

export const leerInput=async(message:string)=>{
    const question=[
        {
            type:'input',
            name:'desc',
            message,
            validate(value:string){
                if(value.length===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]
    const {desc}= await inquirer.prompt(question);
     return desc;   
}
const arregloObjetValueName=async(tareas:Tarea[])=>{
    const elecciones: Array<Answers> = tareas.map((tarea, index) => {
        const idx = colors.green(`${index + 1}`);
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked:(!!tarea.completadoEn)?true:false
        }
    });
    return elecciones;
}

export const listadoTareasBorrar=async(tareas:Tarea[])=>{
 const choices = await arregloObjetValueName(tareas);
 choices.unshift({
    value:'0',
    name:colors.green('0.')+' Cancelar'
 })
 const question=[
    {
        type:'list',
        name:'id',
        message:'Borrar',
        choices
    }
]
const {id}= await inquirer.prompt(question);
return id;

}
export const confirmar =async(message:string)=>{
    const question=[
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];
    const {ok}=await inquirer.prompt(question);
    return ok;
}

export const mostrarListadosCheckList = async(tareas:Tarea[]) => {
    const choices= await arregloObjetValueName(tareas);


    const pregunta= [
        {
            type: "checkbox",
            name: "ids",
            message: "Seleccione",
            choices
        }
    ];
    const { ids } = await inquirer.prompt(pregunta);

    return ids;
}
