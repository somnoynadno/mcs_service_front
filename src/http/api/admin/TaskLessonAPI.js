import {HTTP} from "../../http-common";

export class TaskLessonAPI {
    AddTasksToLesson(lessonID, tasks) {
        let taskLessons = [];
        for (let t of tasks) {
            taskLessons.push({task_id: t.id, lesson_id: lessonID});
        }

        return new Promise((resolve) => {
            HTTP.axios.post(`/admin/task_lesson`, taskLessons)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }
}
