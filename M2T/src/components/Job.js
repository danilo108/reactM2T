import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid"
import NameValuePair from "./NameValuePair"
import Typography from "@material-ui/core/Typography"


class Job extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        const job = this.props.job
        return (
            <Card >
                <CardContent >
                    <Grid container >
                        <Grid item xs={9}>
                            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                                <Grid item xs={3}><Typography variant="subtitle2" >{job.boxes.total}</Typography></Grid>
                                <Grid item xs={3}><Typography variant="subtitle1" >{job.boxes.formattedSize}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="subtitle2" >{job.code}</Typography></Grid>
                                <Grid item xs={12}><Typography variant="subtitle2" >{job.clientName}</Typography></Grid>
                                <Grid item xs={12}><Typography variant="subtitle1" >{job.jobRef}</Typography></Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <NameValuePair xsLabel="P" label="Panels" value={"" + job.boxes.panels} />
                            <NameValuePair xsLabel="F" label="Frames" value={"" + job.boxes.frames} />
                            <NameValuePair xsLabel="H" label="Hardware" value={"" + job.boxes.hardware} />
           
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }
}

export default Job