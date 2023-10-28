import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonIcon
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { person, list } from 'ionicons/icons';

const Tasks: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState("segment1");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding-start">
        <div className="tasks-info">
          <div className="task-detail">
            <div><IonIcon icon={person} /> Tasks</div>
            <div><IonIcon icon={list} /> You Earned</div>
          </div>
          <div className="task-count">
            <div>9</div>
            <div>$990</div>
          </div>
        </div>
        <IonSegment
          color="default"
          value={selectedSegment}
          onIonChange={(e) => setSelectedSegment(e.detail.value)}
        >
          <IonSegmentButton value="segment1">Segment 1</IonSegmentButton>
          <IonSegmentButton value="segment2">Segment 2</IonSegmentButton>
          {/* Add more segments as needed */}
        </IonSegment>
        {selectedSegment === "segment1" && (
          <div>
            <h2>Content for Segment 1</h2>
            {/* Add content for Segment 1 */}
          </div>
        )}

        {selectedSegment === "segment2" && (
          <div>
            <h2>Content for Segment 2</h2>
            {/* Add content for Segment 2 */}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
