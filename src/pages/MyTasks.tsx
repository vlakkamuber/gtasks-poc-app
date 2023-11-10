import React, { useState,useEffect } from "react";
import {
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import CompletedTasks from "./CompletedTasks";
const MyTasks: React.FC = () => {
  const [inProgressCount,setInProgressCount] = useState("")
  const [completedCount,setCompletedCount] = useState("")
  const [blockedCount,setBlockedCount] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("completed");
  const handleSegmentChange = (e: CustomEvent) => {
    setSelectedSegment(e.detail.value);
  };
  useEffect(() => {
    let userTasks = JSON.parse(localStorage.getItem("tasks"));
    let user = userTasks[0]
    // let user = (userTasks && userTasks.find(function(item){
    //   return item.phone===localStorage.getItem("phone")
    // })) || userTasks[0]
    if(user){
      let inProgressTasks = user.tasks && user.tasks.filter(function(item){
        return item.status==='In Progress'
      })
      let completedTasks = user.tasks && user.tasks.filter(function(item){
        return item.status==='Completed'
      })
      let blockedTasks = user.tasks && user.tasks.filter(function(item){
        return item.status==='Blocked'
      })
      setInProgressCount(inProgressTasks.length)
      setCompletedCount(completedTasks.length)
      setBlockedCount(blockedTasks.length)
    }
   
  }, []);

  const history = useHistory();
  
  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };
  return (
    <React.Fragment>
      {/* <IonSegment onIonChange={handleSegmentChange} value={selectedSegment} style={{marginTop:'30px'}}> */}
        {/* <IonSegmentButton value="inProgress" style={{'textTransform': 'capitalize'}}>
          <div className="mytask-segment-content">
            <div className="mytask-segment-text">In Progress</div>
            {selectedSegment === 'inProgress' && <IonBadge className="mytask-segmnet-badge">{inProgressCount}</IonBadge>}
          </div>
        </IonSegmentButton> */}
        {/* <IonSegmentButton value="completed" style={{'textTransform': 'capitalize'}}>
          <div className="mytask-segment-content">
            <div className="mytask-segment-text">Completed</div> */}
            {/* {selectedSegment === 'completed' && <IonBadge  className="mytask-segmnet-badge">{completedCount}</IonBadge>} */}
          {/* </div>
        </IonSegmentButton> */}
        {/* <IonSegmentButton value="blocked" style={{'textTransform': 'capitalize'}}>
          <div className="mytask-segment-content">
            <div className="mytask-segment-text">Blocked</div>
            {selectedSegment === 'blocked' &&<IonBadge className="mytask-segmnet-badge">{blockedCount}</IonBadge>}
          </div>
        </IonSegmentButton> */}
      {/* </IonSegment> */}
      {/* {selectedSegment === 'inProgress' && <InProgressTasks />} */}
      {/* {selectedSegment === 'completed' && <CompletedTasks />} */}
      {/* {selectedSegment === 'blocked' && <BlockedTasks />} */}
      <CompletedTasks />
    </React.Fragment>
  );
};

export default MyTasks;
