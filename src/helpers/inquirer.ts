import colors from "colors";
import inquirer from "inquirer";

const preguntas=[
    {
        type:'list',
        name:'opcion',
        message:'Qué desea hacer?',
        choices:[
            {
                value:'1',
                name:'1. Crear tarea'
            },
            {
                value:'2',
                name:'2. Listar tareas'
            },
            {
                value:'3',
                name:'3. Listar tareas completadas'
            },
            {
                value:'4',
                name:'4. Listar tareas pendientes'
            },
            {
                value:'5',
                name:'5. Completar tarea(s)'
            },
            {
                value:'6',
                name:'6. Borrar tarea'
            },
            {
                value:'0',
                name:'2. Salir'
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