import {HTTP} from "../../http-common";

export class SubjectAPI {
    GetAllSubjects() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/all_subjects`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        })
    }

    GetSubject(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/subject/${id}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    CreateSubject(name, description) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/admin/subject`, {
                name: name,
                description: description,
            })
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    UpdateSubject(id, name, description) {
        return new Promise((resolve) => {
            HTTP.axios.put(`/admin/subject/${id}`, {
                name: name,
                description: description,
            })
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    DeleteSubject(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/admin/subject/${id}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }
}
