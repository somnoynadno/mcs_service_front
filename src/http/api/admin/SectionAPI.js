import {HTTP} from "../../http-common";

export class SectionAPI {
    GetSectionsBySubjectID(subjectID) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/sections_by_subject/${subjectID}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    GetSection(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/section/${id}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    CreateSection(name, description, password, subjectID) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/admin/section`, {
                name: name,
                description: description,
                subject_id: subjectID,
                password: password,
                section_type_id: 1, // suggestion by default
            })
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    UpdateSection(id, name, description, password, subjectID, sectionTypeID) {
        return new Promise((resolve) => {
            HTTP.axios.put(`/admin/section/${id}`, {
                name: name,
                description: description,
                password: password,
                subject_id: subjectID,
                section_type_id: sectionTypeID,
            })
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    DeleteSection(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/admin/section/${id}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }
}
