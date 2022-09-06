import {Pipe, PipeTransform} from '@angular/core';
import ITask from '../interface/ITask';

@Pipe({
    name: 'completedTasks'
})

export class CompletedTasksPipe implements PipeTransform { 
    transform(tasks: ITask, ...args: any[]): string {
        if(tasks.subTasks && tasks.subTasks.length > 0) {
            return tasks.subTasks.filter(task => task.complete).length.toString();
        }
        return "0";
    }
}