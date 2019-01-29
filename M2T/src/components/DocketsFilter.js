import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import { FormControl, NativeSelect } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip"


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    
    display: "flex"
    // wrap: "nowrap"
    
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  form:{
      width: "100%"
  },
   textField: {
    margin: theme.spacing.unit,
    display: "flex"
  },
  inputLabel:{
      whiteSpacing: "nowrap"
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

 const FilterOperators = [
        [
            "CONTAINS",
            "Contains"
            
        ],
        [
            "STARTSWITH",
            "Starts with"
            
        ],
        [
            "ENDSWITH",
            "Ends with"
            
        ],
        [
            "ISEQUALTO",
            "Is equal to"
            
        ],
        [
            "MATCHES",
            "Matches"
        ]

    ]
class DocketsFilter extends React.Component{

   
    constructor(props){
        super(props)
        this.state = {
            containerFilter : "",
            containerOperator: "",
            codeFilter : null,
            codeOperator: null,
            clientFilter : null,
            clientOperator: null,
            clientAddressFilter : null,
            clientAddressOperator: null,
            installersFilter : null,
            filterSummary: "Filter",
            isFilterValid: false
        }

        this.filterOperators = new Map(FilterOperators)

        this.onSubmit.bind(this)
       
    }
    onSubmit = (event) =>{ 
            if(this.props.onSubmit){
                this.props.onSubmit(this.state)
            }else{
                
            }
            event.preventDefault();
        }

    
    onOperatorChange = operatorName => event =>{
      
        if("CONTAINER" === operatorName){
            this.setState({containerOperator: event.target.value})
            if(event.target.value ==""){
                this.setState({containerFilter:""})
            }
        }else if("CLIENT" === operatorName){
            this.setState({
                clientOperator: event.target.value
            })
            if(event.target.value ==""){
                this.setState({clientFilter:""})
            }
        }else if("ADDRESS" === operatorName){
            this.setState({
                clientAddressOperator: event.target.value
            })
            if(event.target.value ==""){
                this.setState({clientAddressFilter:""})
            }
        }else if("CODE" === operatorName){
            this.setState({
                codeOperator: event.target.value
            })
            if(event.target.value ==""){
                this.setState({codeFilter:""})
            }
        } 
        this.performFilter()
     
    }

    onFilterChange = filterName => event =>{
        if("CONTAINER" === filterName){
             this.setState({containerFilter: event.target.value})
        }else if("CLIENT" === filterName){
            this.setState({
                clientFilter: event.target.value
            })
        }else if("ADDRESS" === filterName){
            this.setState({
                clientAddressFilter: event.target.value
            })
        }else if("CODE" === filterName){
            this.setState({
                codeFilter: event.target.value
            })
        } 

        this.performFilter()
    }
    performFilter = () =>{
        if(this.shouldFilterActionPerform() ||
            (
                //this is a hook for the parent component to override the decision
                this.props.shouldFilterActionPerform &&
                this.props.shouldFilterActionPerform(this.state)

            )
        ){
            try {
                if(this.props.performFilter){
                    this.props.performFilter(this.state)
                }
                
            } catch (error) {
                console.error("Error while performing the filter function ", this.props, error)
            }
        }
    }

    shouldFilterActionPerform = () =>{
        return (

                    (
                        this.checkFilterCriteria( this.state.containerOperator, this.state.containerFilter) 
                    )
        )
    }

    checkFilterCriteria = (operator, filter) =>{
        const o = operator?true:false
        const f = filter?true:false
        return o === f
    }
    getFilterLabel(operator, value){
        if(!(operator) ){
            return "  -  "
        }
        let label = this.filterOperators.get(operator);

        return value?label.concat(" ").concat(value):"not set"
    }

    calculateFilterSummary = () =>{
        let filters = []
      
        let filterSummary = "No filter set"
        if(this.state.containerOperator || this.state.codeOperator || this.state.clientOperator || this.state.clientAddressOperator){
            filterSummary = "Filte by "
        }
        filters.push((<Typography >{filterSummary}</Typography>))
        try {
             
                if(this.state.containerOperator){
                    let summary = ""
                    let operatorName = "Container "
                    summary+= operatorName
                    summary+= (this.getFilterLabel(this.state.containerOperator, this.state.containerFilter))
                  
                    const chip = (
                        <Chip
                        color="primary"
                        key={operatorName}
                        label={summary}
                        onDelete={() =>{this.setState({containerOperator:"", containerFilter:""})}}
                        className={styles.chip}
                        />     
                    )
                    filters.push(chip)
                }
                if(this.state.codeOperator){
                    let summary = ""
                    let operatorName = ("Code ")
                    summary+= operatorName
                    summary+= (this.getFilterLabel(this.state.codeOperator, this.state.codeFilter))
                    const chip = (
                        <Chip
                        key={operatorName}
                        label={summary}
                        onDelete={() =>{this.setState({codeOperator:"", codeFilter:""})}}
                        className={styles.chip}
                        />     
                    )
                    filters.push(chip)
                }
                if(this.state.clientOperator){
                    let summary = ""
                    let operatorName = "Client "
                    summary+= operatorName
                    summary+= (this.getFilterLabel(this.state.clientOperator, this.state.clientFilter))
                    const chip = (
                        <Chip
                        key={operatorName}
                        label={summary}
                        onDelete={() =>{this.setState({clientOperator:"", clientFilter: ""})}}
                        className={styles.chip}
                        />     
                    )
                    filters.push(chip)

                }
                if(this.state.clientAddressOperator){
                    let summary = ""
                    let operatorName = "Address "
                    summary+= operatorName
                    summary+= (this.getFilterLabel(this.state.clientAddressOperator, this.state.clientAddressFilter))
                    const chip = (
                        <Chip
                        key={operatorName}
                        label={summary}
                        onDelete={() =>{this.setState({clientAddressOperator:"", clientAddressFilter:""})}}
                        className={styles.chip}
                        />     
                    )
                    filters.push(chip)
                }
          
            
        } catch (error) {
          console.error(error)
        }
       return filters
    }

    render = () => {
        const { classes } = this.props;

        return (
             <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
               <Grid alignItems="flex-start" justify="flex-start" direction="row"   >{ this.calculateFilterSummary().map(element=>{return (<Grid item>{element}</Grid>)})}</Grid> 
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form onSubmit={this.onSubmit} className={classes.form} >
                        <List >
                            <ListItem>
                                <Grid container>

                                    <Grid xs={6} item>
                                        <FormControl className={classes.formControl} >
                                            <InputLabel htmlFor="containerOperator" className={classes.inputLabel}>Cont. num. that</InputLabel>
                                            <NativeSelect 
                                                value={this.state.containerOperator} 
                                                input={<Input name="containerOperator" id="containerOperator"  />}
                                                onChange={this.onOperatorChange("CONTAINER")} >
                                                    <option  value="" />
                                                   {
                                                       Array.from(this.filterOperators.keys()).map((key) => {
                                                           
                                                        return <option key={key} value={key}>{this.filterOperators.get(key)}</option>    
                                                   })}
                                            </NativeSelect>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            value={this.state.containerFilter}
                                            onChange={this.onFilterChange("CONTAINER")}
                                            id="containerFilter"
                                            label="Matching word"
                                            helperText="Write the word matching the container number"
                                            className={classes.textField}
                                            margin="normal"
                                            InputProps={{
                                            
                                            }}
                                            />
                                    </Grid>
                                    <Grid xs={6} item>
                                        <FormControl className={classes.formControl} >
                                            <InputLabel htmlFor="clientOperator" className={classes.inputLabel}>Client name that</InputLabel>
                                            <NativeSelect 
                                                value={this.state.clientOperator} 
                                                input={<Input name="clientrOperator" id="clientOperator"  />}
                                                onChange={this.onOperatorChange("CLIENT")} >
                                                    <option key="empty" value="" />
                                                   {
                                                       Array.from(this.filterOperators.keys()).map((key) => {
                                                           
                                                        return <option key={key} value={key}>{this.filterOperators.get(key)}</option>    
                                                   })}
                                            </NativeSelect>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            value={this.state.clientFilter}
                                            onChange={this.onFilterChange("CLIENT")}
                                            id="clientFilter"
                                            label="Matching word"
                                            helperText="Write the word matching the client name"
                                            className={classes.textField}
                                            margin="normal"
                                            InputProps={{
                                            
                                            }}
                                            />
                                    </Grid>
                                    <Grid xs={6} item>
                                        <FormControl className={classes.formControl} >
                                            <InputLabel htmlFor="addressOperator" className={classes.inputLabel}>Address that</InputLabel>
                                            <NativeSelect 
                                                value={this.state.addressOperator} 
                                                input={<Input name="addressOperator" id="addressOperator"  />}
                                                onChange={this.onOperatorChange("ADDRESS")} >
                                                    <option  value="" />
                                                   {
                                                       Array.from(this.filterOperators.keys()).map((key) => {
                                                           
                                                        return <option key={key} value={key}>{this.filterOperators.get(key)}</option>    
                                                   })}
                                            </NativeSelect>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            value={this.state.clientAddressFilter}
                                            onChange={this.onFilterChange("ADDRESS")}
                                            id="clientAddressFilter"
                                            label="Matching word"
                                            helperText="Write the word matching the client address"
                                            className={classes.textField}
                                            margin="normal"
                                            InputProps={{
                                            
                                            }}
                                            />
                                    </Grid>
                                    
                                </Grid>
                            </ListItem>
                        </List>
                    </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )

    }
}

export default withStyles(styles)(DocketsFilter)