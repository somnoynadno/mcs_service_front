import {HTTP} from "../../http-common";

export class LessonAPI {
    GetLessonsBySubjectID(subjectID) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/lessons_by_subject/${subjectID}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    GetLesson(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/lesson/${id}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    CreateLesson() {
        return new Promise((resolve) => {
            HTTP.axios.post(`/admin/lesson`, {})
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    UpdateLesson(id) {
        return new Promise((resolve) => {
            HTTP.axios.put(`/admin/lesson/${id}`, {})
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    DeleteLesson(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/admin/lesson/${id}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }
}
