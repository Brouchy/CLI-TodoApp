import fs from 'fs'
import { Tarea } from '../models/tareas.js';

const path='./src/db/data.json';
export const guardarDB=(data:Tarea[])=>{
    fs.writeFileSync(path,JSON.stringify(data));
}

export const leerDB=():Tarea[]|null=>{
    if(!fs.existsSync(path)){
        return null;
    }

    const info=fs.readFileSync(path,{encoding:'utf-8'});
    const data=JSON.parse(info);
    return data;
}