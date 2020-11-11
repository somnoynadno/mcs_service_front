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

    CreateLesson(name, additionalInfo, password, fromDate, dueDate, isVisible, lessonTypeID, subjectID) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/admin/lesson`, {
                name: name,
                additional_info: additionalInfo,
                password: password,
                from_date: fromDate,
                due_date: dueDate,
                is_visible: isVisible,
                lesson_type_id: lessonTypeID,
                subject_id: subjectID
            })
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    UpdateLesson(id, name, additionalInfo, password, fromDate, dueDate, isVisible, lessonTypeID, subjectID) {
        return new Promise((resolve) => {
            HTTP.axios.put(`/admin/lesson/${id}`, {
                name: name,
                additional_info: additionalInfo,
                password: password,
                from_date: fromDate,
                due_date: dueDate,
                is_visible: isVisible,
                lesson_type_id: lessonTypeID,
                subject_id: subjectID
            })
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
