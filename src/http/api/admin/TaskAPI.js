import {HTTP} from "../../http-common";

export class TaskAPI {
    GetTasksBySectionID(sectionID) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/tasks_by_section/${sectionID}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        })
    }

    GetTask(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/task/${id}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    CreateTask(name, description, solution, author, difficulty, sectionID) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/admin/task`, {
                name: name,
                description: description,
                solution: solution,
                author: author,
                difficulty: difficulty,
                section_id: sectionID,
            })
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    UpdateTask(id, name, description, solution, author, difficulty, sectionID) {
        return new Promise((resolve) => {
            HTTP.axios.put(`/admin/task/${id}`, {
                name: name,
                description: description,
                solution: solution,
                author: author,
                difficulty: difficulty,
                section_id: sectionID,
            })
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    DeleteTask(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/admin/task/${id}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }
}
