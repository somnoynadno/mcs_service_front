import React, {useEffect, useState} from "react";

import Typography from "@material-ui/core/Typography";
import {StatsAPI} from "../../http/api/StatsAPI";


export const StatsView = (props) => {
    let [stats, setStats] = useState(null);

    useEffect(() => {
        async function fetchStats() {
            const api = new StatsAPI();
            return await api.GetEntityCount();
        }

        fetchStats().then((s) => {
            setStats(s);
        })
    }, [props]);

    if (stats === null) return '';
    else return (
        <div>
            <Typography variant="overline" display="block" gutterBottom>
                {stats["sections_count"]} разделов создано
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
                {stats["tasks_count"]} задач придумано
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
                {stats["materials_count"]} материалов опубликовано
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
                {stats["lessons_count"]} классных занятий
            </Typography>
        </div>
    );
}
