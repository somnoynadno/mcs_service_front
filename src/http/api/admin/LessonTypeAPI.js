import {HTTP} from "../../http-common";

export class LessonTypeAPI {
    GetAllLessonTypes() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/all_lesson_types`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        })
    }
}
