import React from "react"
import Paper from "@material-ui/core/Paper"
import NameValuePair from "./NameValuePair"
import PropTypes from "prop-types"


class MessageDisplay extends React.Component{
  
    constructor(props){
        super(props)
        // this.refreshMessages(props)
    }

    refreshMessages = (props) =>{
        let messages = []
        if(props.errors){
            const e =  props.errors.map((msg, index) =>{
                return {
                    message: msg,
                    type: "error"
                }
            })
        }
        if(props.infos){
            const e =  props.infos.map((msg, index) =>{
                return {
                    message: msg,
                    type: "info"
                }
            })
           messages.concat(e)
        }
        if(props.warnings){
            const e =  props.warnings.map((msg, index) =>{
                return {
                    message: msg,
                    type: "warning"
                }
            })
           messages.concat(e)
        }
        if(props.successes){
            const e =  props.successes.map((msg, index) =>{
                return {
                    message: msg,
                    type: "success"
                }
            })
           messages.concat(e)
        }
        return messages
    }

    render = () =>{
        const messages = this.refreshMessages(this.props)
        console.log("displaying messages ", messages, this.props)
        return (
            <Paper>
                {messages.map(item =>{
                    console.log(item)
                    return <NameValuePair label={item.type} value={item.message} />
                })}
            </Paper>
        )
    }
}

MessageDisplay.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
    infos: PropTypes.arrayOf(PropTypes.string),
    warnings: PropTypes.arrayOf(PropTypes.string),
    successes: PropTypes.arrayOf(PropTypes.string),
    
}

export default MessageDisplay