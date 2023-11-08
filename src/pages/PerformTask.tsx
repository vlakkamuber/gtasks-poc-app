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
  IonRadio,
} from "@ionic/react";

import { useHistory, useParams } from "react-router-dom";
import {
  arrowBack,
  saveOutline,
  micOutline,
  pencil,
  trash,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
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
  const [audioClip, setAudioClip] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  useEffect(() => {
    let userTasks = JSON.parse(localStorage.getItem("tasks"));
    let user = userTasks.find(function (item) {
      return item.phone === localStorage.getItem("phone");
    });
    let selectedTask = user.tasks.find(function (item) {
      return item.id === params.id;
    });
    setSelectedTask(selectedTask);
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks([...audioChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      };

      recorder.start();
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

  useEffect(() => {
    if (audioChunks.length) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      console.log(audioBlob.size, audioBlob.type);
      setAudioBlob(audioBlob);
    }
  }, [audioChunks]);

  useEffect(() => {
    // const audioList = localStorage.getItem("recordedAudio")
    // if(audioList)
    // setAudioList(audioList);
    // fetch("http://localhost:8000/get-recorded-audio")
    //   .then(function (res) {
    //     return res.json();
    //   })
    //   .then(function (data) {
    //     setAudioList(data.audioFiles);
    //     setAudioClip(data.audioList[0]);
    //   });
  }, []);
  useEffect(() => {
    //getAudioClipByTaskId();
  }, []);

  const getAudioClipByTaskId = ()=>{
    fetch("http://localhost:8000/")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setAudioList(data.audioFiles);
        setAudioClip(data.audioList[0]);
      });
  }

  const saveAudioToAPI = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("taskId", params.id);
    try {
      const response = await fetch("http://localhost:8000/save_audio", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let userTasks = JSON.parse(localStorage.getItem("tasks"));
        let user = userTasks.find(function (item) {
          return item.phone === localStorage.getItem("phone");
        });
        let updatedTasks = user.tasks.map((item) =>
          item.id === selectedTask.id ? { ...item, status: "Completed" } : item
        );
        userTasks = userTasks.map((item) =>
          item.phone === localStorage.getItem("phone")
            ? { ...item, tasks: updatedTasks }
            : item
        );
        console.log(userTasks);
        localStorage.setItem("tasks", JSON.stringify(userTasks));
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
          <h4 className="no-padding-margin">
            {selectedTask.name} {selectedTask.id}
          </h4>
          <p className="no-padding-margin" style={{ fontSize: "0.9rem" }}>
            <samll>
              Assigned time: {selectedTask.startDate} End time:{" "}
              {selectedTask.endDate}
            </samll>
          </p>
          <p className="no-padding-margin">
            <span style={{ fontSize: "0.9rem" }}>Payouts:</span>{" "}
            <span style={{ fontWeight: "600" }}>${selectedTask.pay}</span>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "10px",
            margin: "20px",
          }}
        >
          {(selectedTask.type === "Text to audio" ||
            selectedTask.type === "Text To audio") && (
            <div>
              <IonLabel className="label-with-margin">Text Script</IonLabel>
              <IonTextarea
                style={{
                  background: "#f3f3f3", // Set the grey background color
                  height: "200px", // Set the desired height// Set the desired width
                  padding: "10px",
                  marginBottom: "11px", // Optional padding
                  borderRadius: "10px",
                }}
                value={selectedTask.input}
              ></IonTextarea>
            </div>
          )}
          {(selectedTask.type === "Audio to audio" ||
            selectedTask.type === "Audio To Audio") && (
            <div>
              <h5>Audio clips</h5>
              <AudioPlayer
                audioSrc={`http://localhost:8000/audio/audio-clip-task-${params.id}.wav`}
              />
            </div>
          )}

          {/* Label for Audio Recording */}
          <IonLabel className="label-with-margin">Convert into audio</IonLabel>
          <div>
            {/* Display the recorded audio for playback (Step 4) */}
            {audioChunks.length > 0 && (
              // <audio controls>
              //   <source
              //     src={URL.createObjectURL(
              //       new Blob(audioChunks, { type: "audio/wav" })
              //     )}
              //   />
              // </audio>
              <AudioPlayer
                audioSrc={URL.createObjectURL(
                  new Blob(audioChunks, { type: "audio/wav" })
                )}
              />
            )}
            {selectedTask.status==="Completed" && (
              <div>
                <h5>Saved audio version</h5>
                {/* {audioList.map((source, index) => ( */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <IonRadio
                      color="primary" // Set the checkbox color to "primary"
                      slot="start" // Position the checkbox on the left
                      checked={true}
                      class="black-circle-checkbox"
                    ></IonRadio>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60vw",
                      }}
                    >
                      <AudioPlayer
                        audioSrc={`http://localhost:8000/audio/task-${params.id}.wav`}
                      />
                      {/* <audio controls>
                    <source
                      src={`http://localhost:8000/audio/${source}`}
                      type="audio/wav"
                    />
                  </audio> */}
                    </div>
                    <div className="icon-container">
                      <div className="icon">
                        <IonIcon icon={pencil}></IonIcon>
                      </div>
                      <div className="icon">
                        <IonIcon icon={trash}></IonIcon>
                      </div>
                    </div>
                  </div>
                {/* ))} */}
              </div>
            )}
          </div>

          {/* Centered Audio Recording Component */}
          <IonGrid style={{ width: "100%" }}>
            {isRecording ? (
              <IonRow>
                <IonCol
                  style={{
                    height: "300px",
                    backgroundColor: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <div style={audioRecordingStyle} onClick={stopRecording}>
                    <div className="tap-save-container">
                      <IonIcon icon={saveOutline} className="tap-save-icon" />
                    </div>
                    <span className="save-text">Tap to Save</span>
                  </div>
                </IonCol>
              </IonRow>
            ) : (
              <IonRow>
                <IonCol
                  style={{
                    height: "300px",
                    backgroundColor: "#f3f3f3",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <div style={audioRecordingStyle} onClick={startRecording}>
                    <div>
                      <IonIcon
                        icon={micOutline}
                        style={{ fontSize: "4rem", color: "#467ff4" }}
                      ></IonIcon>
                    </div>

                    <IonButton
                      expand="block"
                      color="primary"
                      className="ion-small"
                    >
                      Start Recording
                    </IonButton>
                  </div>
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
          <div className="button-container">
            <IonButton
              expand="block"
              color="primary"
              className="signup-login-button"
              onClick={(e) => saveAudioToAPI(e)}
              disabled={selectedTask.status==="Completed"}
            >
              Submit
            </IonButton>
            {isRecording && (
              <IonButton
                expand="block"
                color="secondary"
                className="signup-login-button"
                 disabled={selectedTask.status==="Completed"}
              >
                Help
              </IonButton>
            )}
            <IonButton
              expand="block"
              color="secondary"
              className="signup-login-button"
              routerLink="/dashboard/tasks/"
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
  color: "#fff",
  width: "100px",
  borderRadius: "50%",
  gap: "2px",
};

export default PerformTask;
