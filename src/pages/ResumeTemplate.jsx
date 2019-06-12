import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PDFExport } from '@progress/kendo-react-pdf';
import { Button, Tooltip } from 'reactstrap';

// import "./ResumeTemplate.scss";


class ResumeTemplate extends Component {
    constructor(){
        super();
    }
    exportPDF = () => {
        this.resume.save();
    }
    render(){
        return(
            <div>
                {/* <div style={{ textAlign: 'center', marginBottom: 10 }}><button onClick={this.exportPDF} style={{ margin: 'auto' }}>download</button></div>
                <PDFExport paperSize={'Letter'}
                    fileName="_____.pdf"
                    title=""
                    subject=""
                    keywords=""
                    ref={(r) => this.resume = r}>
                        <div style={{
                            height: 700,
                            width: 600,
                            padding: 'none',
                            backgroundColor: 'white',
                            boxShadow: '5px 5px 5px black',
                            margin: 'auto',
                            overflowX: 'hidden',
                            overflowY: 'hidden',
                            hover:true}}> 
                            <h1 style={{backgroundColor:"teal", textAlign:"center"}}>Example Resume</h1>
                            </div>

                            
                </PDFExport>                        */}
                <h1>What is a resume?</h1>
                <h4>A resume is a document that outlines your personal, educational, and 
                    professional acheivements and qualifications when you apply for a job! </h4>
                <h1>What is the purpose of it?</h1>
                <h4>Resumes are a summary of your experiences which is one of the most
                    important things employers look at when you apply to jobs. If the hiring manager likes 
                    your resume and thinks your experiences will match the job qualifications, then you have a high chance of getting hired.
                </h4>
                <h1>What goes in a resume?</h1>
                <h4>What goes in a resume is different based on what you're studying and what type of job you are applying
                    to. Here are some general components of a resume:
                </h4>
                <li>Education Details</li>
                <li>Any Work Experience (part-time jobs, full-time, job shadowing, etc.)</li>
                <li>Any Project Experiences</li>
                <li>Any Volunteer/Leadership Experiences</li>
                <li>Technical Skills (skills that you will use on the job)</li>
                <li>Personal Skills (skills that make you a great addition to the company/team)</li>
                
                <h1>Helpful Tips:</h1>
                    <li>Keep your resume one page long</li>
                    <li>Use headers and subheaders to make content clear</li>
                    <li>Any Leadership Experiences</li>

                <h1>Here is an example of a resume:</h1>
                
                
            </div>
           
        )
    }
}

// class ResumeTemplate extends Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       tooltipOpen: false
//     };
//   }

//   toggle() {
//     this.setState({
//       tooltipOpen: !this.state.tooltipOpen
//     });
//   }

//   render() {
//     return (
//       <span>
//         <Button className="mr-1" color="secondary" id={'Tooltip-' + this.props.id}>
//           {this.props.item.text}
//         </Button>
//         <Tooltip placement={this.props.item.placement} isOpen={this.state.tooltipOpen} target={'Tooltip-' + this.props.id} toggle={this.toggle}>
//           Tooltip Content!
//         </Tooltip>
//       </span>
//     );
//   }
// }

// class TooltipExampleMulti extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       tooltips: [
//         {
//           placement: 'top',
//           text: 'Top'
//         },
//         {
//           placement: 'bottom',
//           text: 'Bottom'
//         },
//         {
//           placement: 'left',
//           text: 'Left'
//         },
//         {
//           placement: 'right',
//           text: 'Right'
//         }
//       ]
//     };
//   }

//   render() {
//     return (
//       <div>
//         { this.state.tooltips.map((tooltip, i) => {
//           return <TooltipItem key={i} item={tooltip} id={i} />;
//         })}
//       </div>
//     );
//   }
// }





export default ResumeTemplate;
