import {HTTP} from "../../http-common";

export class MaterialAPI {
    GetMaterialsBySectionID(sectionID) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/materials_by_section/${sectionID}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        })
    }

    GetMaterial(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/material/${id}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    CreateMaterial(name, content, isVisible, sectionID) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/admin/material`, {
                name: name,
                content: content,
                is_visible: isVisible,
                section_id: sectionID,
            })
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    UpdateMaterial(id, name, content, isVisible, sectionID) {
        return new Promise((resolve) => {
            HTTP.axios.put(`/admin/material/${id}`, {
                name: name,
                content: content,
                is_visible: isVisible,
                section_id: sectionID,
            })
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }

    DeleteMaterial(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/admin/material/${id}`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        });
    }
}
