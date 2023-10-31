import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonLabel,
  IonTextarea,
  IonButton,
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/react";
import { micOutline } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import { useHistory, useParams } from "react-router-dom";
import { arrowBack, saveOutline } from "ionicons/icons";
import { useState, useEffect } from "react";
const PerformTask: React.FC = () => {
  const history = useHistory();
  const params = useParams();

  const goBack = () => {
    history.goBack(); // This function navigates back to the previous page
  };
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [textScript, setTextScript] = useState(
    "To continue driving and supporting local restaurants, you can deliver food with Uber Eats.Start receiving delivery requests by turning them on now. If you change your mind, you can turn them off later."
  );

  const [audioList, setAudioList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks([...audioChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        // Save the recorded audio by sending it to the API (Step 3)
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        //setAudioBlob(audioBlob)
      };

      recorder.start();
      setIsRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  

  const playAudio = (index) => {
    setIsPlaying(index);
  };

  const pauseAudio = () => {
    setIsPlaying(null);
  };
  useEffect(() => {
    if (audioChunks.length) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      console.log(audioBlob.size, audioBlob.type);
      setAudioBlob(audioBlob);
    }
  }, [audioChunks]);

  useEffect(() => {
    fetch("http://localhost:8000/get-recorded-audio")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data.audioFiles)
        setAudioList(data.audioFiles);
      });
  }, []);

  const saveAudioToAPI = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("Audio Blob type:", audioBlob.type);
    console.log("Audio Blob size:", audioBlob.size);
    formData.append("audio", audioBlob);
    formData.append("taskId", params.id);
    try {
      const response = await fetch("http://localhost:8000/save_audio", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Audio saved to the API.");
        history.push("/dashboard/tasks/completed");
      } else {
        console.error("Error saving audio to the API.");
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} />
            {/* <IonButton onClick={goBack}>Back</IonButton> */}
          </IonButtons>
          <IonTitle className="ion-text-center">Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "10px",
            margin: "20px",
          }}
        >
          <IonLabel className="label-with-margin">Text Script</IonLabel>
          <IonTextarea
            style={{
              background: "#f3f3f3", // Set the grey background color
              height: "200px", // Set the desired height// Set the desired width
              padding: "10px",
              marginBottom: "11px", // Optional padding
            }}
            value={textScript}
          ></IonTextarea>

          {/* Label for Audio Recording */}
          <IonLabel className="label-with-margin">Convert into audio</IonLabel>

          {/* Centered Audio Recording Component */}
          <IonGrid>
            {isRecording ?(<IonRow>
              <IonCol
                style={{
                  height: "300px",
                  backgroundColor: "#000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={audioRecordingStyle} onClick={stopRecording}>
                <span className="save-text">Tap to Save</span>
                  <IonIcon icon={saveOutline} className="save-icon" />
                </div>
              </IonCol>
            </IonRow>) : (<IonRow>
              <IonCol
                style={{
                  height: "300px",
                  backgroundColor: "#f3f3f3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={audioRecordingStyle} onClick={startRecording}>
                  <IonIcon
                    icon={micOutline}
                    style={{ fontSize: "4rem" }}
                  ></IonIcon>
                  <IonButton expand="block" color="primary" class="ion-small">
                    Start Recording
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>)}
          </IonGrid>
          <div>
            {/* Display the recorded audio for playback (Step 4) */}
            {audioChunks.length > 0 && (
              <audio controls>
                <source
                  src={URL.createObjectURL(
                    new Blob(audioChunks, { type: "audio/wav" })
                  )}
                />
              </audio>
            )}
            <div>
              {audioList.map((source, index) => (
                <div key={index}>
                  <audio controls>
                    <source src={`http://localhost:8000/audio/${source}`} type="audio/wav" />
                  </audio>
                </div>
              ))}
            </div>
          </div>
          <div className="button-container">
            <IonButton
              expand="block"
              color="secondary"
              className="signup-login-button"
              onClick={(e) => saveAudioToAPI(e)}
            >
              Submit
            </IonButton>
            <IonButton
              expand="block"
              color="secondary"
              className="signup-login-button"
            >
              Help
            </IonButton>
            <IonButton
              expand="block"
              color="secondary"
              className="signup-login-button"
            >
              Cancel
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
const audioRecordingStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
};

export default PerformTask;
