import {HTTP} from "../../http-common";

export class TaskTypeAPI {
    GetAllTaskTypes() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/all_task_types`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        })
    }
}
