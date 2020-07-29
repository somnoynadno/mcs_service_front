import axios from "axios";
import {apiAddress} from "../../config";
import {HTTP} from "../http-common";

export class StatsAPI {
    GetEntityCount() {
        return new Promise((resolve) => {
            axios.get(apiAddress + `/stats/count`).then(response => {
                resolve(response.data);
            }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }
}
