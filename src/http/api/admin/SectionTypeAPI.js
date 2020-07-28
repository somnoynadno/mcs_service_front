import {HTTP} from "../../http-common";

export class SectionTypeAPI {
    GetAllSectionTypes() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/admin/all_section_types`)
                .then(response => {
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        })
    }
}
