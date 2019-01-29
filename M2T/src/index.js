import React from 'react';
import ReactDOM from 'react-dom';
import PrintReportWizard from './components/PrintReportWizard';

const steps =   [
                    {
                        label:"Select the container",
                        completed: true,
                        description: "Before to print a report you need to select the containers"
                    },
                    {
                        label:"Allocate Jobs",
                        completed: false,
                        description: "Make sure that all the jobs are allocated to the proper pile"
                        
                    },
                    {
                        label:"Review",
                        completed: false,
                        description: "Before to print a report you need to select the containers"
                        
                    }
                    
                ]
const containers = [
                        {
                            containerNumber: "5108", 
                            shippedOn: new Date(),
                            totalBoxes: 580,
                            clients: 45,
                            panels: 440,
                            frames: 135,
                            hardware: 5,
                            jobs: []  
                        },
                        {
                            containerNumber: "5105B", 
                            shippedOn: new Date(),
                            totalBoxes: 450,
                            clients: 33,
                            panels: 340,
                            frames: 108,
                            hardware: 2,  
                            jobs: []  
                        }, {
                            containerNumber: "5105A", 
                            shippedOn: new Date(),
                            totalBoxes: 543,
                            clients: 48,
                            panels: 470,
                            frames: 70,
                            hardware: 3,  
                            jobs: []  
                        }
                        
                    ]
ReactDOM.render(<PrintReportWizard steps={steps} currentStepIndex={1} containers={containers}></PrintReportWizard>, document.getElementById('root'));

