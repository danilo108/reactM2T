import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Avatar from "@material-ui/core/Avatar"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from "@material-ui/core/CardActions"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import NameValuePair from "./NameValuePair"
import Job from "./Job"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from "@material-ui/core/Paper"
import Collapse from "@material-ui/core/Collapse"
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';


const theme = createMuiTheme({
   palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
      contrastText: '#fff',
    },
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    common:{ white: "#ff0000"},
    background: {
    
        default: "#0000ff"

    }
  },
  typography: { useNextVariants: true },
});

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    // backgroundColor: primary,
  },
  cardHeader:{
      backgroundColor: red[200]
  }
});

class Docket extends React.Component{
    constructor(props){
        super(props)
        this.state =  {
            selectedJobs: props.selectedJobs?props.selectedJobs:[],
            expanded: false,
        }
        this.jobs = this.initialiseJobsMap()
        this.selectJob.bind(this)
    }

    initialiseJobsMap = () => {
        let jobs = new Map()
        if(this.props.docket && this.props.docket.jobs){
            this.props.docket.jobs.forEach(job => {
                jobs.set(job.jobId, job)
            });
        }
        return jobs
    }
    selectJob = (job) => {
        const index = this.state.selectedJobs.indexOf(job.jobId)
        const selected = this.state.selectedJobs.map(item=>{return item})
        if(index === -1){
            selected.push(job.jobId)
            if(this.props.addJobSelection){
                this.props.addJobSelection(job)
            }
        }else{
            selected.splice(index, 1)
            if(this.props.removeJobSelection){
                this.props.removeJobSelection(job)
            }
        }
        this.setState({selectedJobs:selected})


    }

    componentDidMount = () =>{
        this.setState({selectedJobs: this.props.selectedJobs})
    }

    render = () => {
        const docket = this.props.docket
        const variant = this.props.variant
        const { classes } = this.props;


        
        if(!docket){
            return null
        }
        if(variant === "bearMinimum"){
            return  (
                 <MuiThemeProvider theme={theme}>
                    <Paper >
                        <Grid container >
                            <Grid item xs={3}>
                                <Typography variant="h6" gutterBottom>{docket.code}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" gutterBottom>{docket.boxes.total}</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="subtitle1" gutterBottom>{docket.jobs.length} Jobs</Typography>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                    </MuiThemeProvider>
                 )
        }else if(variant == "jobCentric"){
            return  (<MuiThemeProvider theme={theme}>
            <Card color="primary">
                {/* <CardHeader
                className={classes.cardHeader}
                    avatar={
                        <Avatar aria-label={docket.code} className={classes.avatar}>
                        {docket.code}
                        </Avatar>
                    }
                    
                    title={docket.boxes.total}
                    subheader={docket.boxes.formattedSize}
                    action={(
                        <Grid container >
                            <Grid item xs="12">
                            <NameValuePair xsLabel="P" label="Panels" value={"" + docket.boxes.panels} />
                            <NameValuePair xsLabel="F" label="Frames" value={"" + docket.boxes.frames} />
                            <NameValuePair xsLabel="H" label="Hardware" value={"" + docket.boxes.hardware} />
                            </Grid> 
                        </Grid>
                    )
                    }
                    >
                </CardHeader> */}
                <CardContent style={{paddingBottom: "0px"}} color="primary" backgroundColor="secondary"   >
                    <Grid container >
                        <Grid item xs={9}>
                            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                                <Grid item xs={3}><Avatar aria-label={docket.code}  className={classes.avatar}>
                        {docket.boxes.total}
                        </Avatar>
                        {/* <Typography variant="subtitle2" >{docket.boxes.total}</Typography> */}
                        </Grid>
                                <Grid item xs={3}><Typography variant="subtitle1" >{docket.boxes.formattedSize}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="subtitle2" >{docket.code}</Typography></Grid>
                                <Grid item xs={12}><Typography variant="subtitle2" >{docket.address}</Typography></Grid>
                                <Grid item xs={12}><Typography variant="subtitle1" >{docket.phone}</Typography></Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <NameValuePair xsLabel="P" label="Panels" value={"" + docket.boxes.panels} />
                            <NameValuePair xsLabel="F" label="Frames" value={"" + docket.boxes.frames} />
                            <NameValuePair xsLabel="H" label="Hardware" value={"" + docket.boxes.hardware} />
                        </Grid>
                    </Grid>
                    
                    </CardContent>
                    
                <CardActions style={{paddingTop: "0px"}}>
                    <Grid container direction="row" justify="space-between" alignItems="flex-end">
                        <Grid item >
                            <Typography >{docket.jobs.length} Jobs</Typography></Grid>
                        <Grid item >
                            <IconButton  
                                onClick={()=>{this.setState({expanded:!this.state.expanded})}}  
                                aria-expanded={this.state.expanded}
                                aria-label="Show more"
                                style={{padding: "0px"}}
                                    >
                                <ExpandMoreIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                     
                </CardActions>
                <Collapse timeout="auto" unmountOnExit in={this.state.expanded}>
                    <CardContent >
                        <List>
                                {docket.jobs.map(job =>{
                                        return (
                                                    <ListItem key={job.jobId} button>
                                                        <ListItemText ><Job job={job} />    </ListItemText>
                                                        <ListItemSecondaryAction>
                                                        <Checkbox
                                                            onChange={(e) => {this.selectJob(job)}}
                                                            checked={this.props.selectedJobs.indexOf(job.jobId) !== -1}

                                                        />
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                )
                                })}
                        </List>
`
                    </CardContent>
                   
                </Collapse>
          
            </Card>
            </MuiThemeProvider>
                 )
        } 
        
    }
}
export default withStyles(styles)( Docket)