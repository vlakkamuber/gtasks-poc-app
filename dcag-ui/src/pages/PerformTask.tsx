import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonLabel,
  IonRadio,
} from "@ionic/react";

import { useHistory, useParams } from "react-router-dom";
import {
  arrowBack,
  saveOutline,
  micOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import { ButtonDock } from "baseui/button-dock";
import { Button, KIND, SHAPE } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { SIZE } from "baseui/input";
import { useTranslation } from "react-i18next";
import apiService from './apiService'
import { formatDate } from "../utils/mapTeluguDigitsToNumeric";
const PerformTask: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams();

  const goBack = () => {
    history.push("/dashboard/tasks"); // This function navigates back to the previous page
  };

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const getTaskDetail = async () => {
    let taskId = params.id;
    let userId = JSON.parse(localStorage.getItem("loggedInUser"))
    apiService
      .getTaskDetail(userId,taskId)
      .then((result) => {
        console.log(result);
        setSelectedTask(result)
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  };

  useEffect(() => {
    getTaskDetail();
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    setSubmitted(false);
    audioChunks.length = 0;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks([...audioChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      audioChunks.length = 0;
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (audioChunks.length) {
      const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
      console.log(audioBlob.size, audioBlob.type);
    }
  }, [audioChunks]);

  const assignTaskToCompleted = (taskId)=>{
    let userId = JSON.parse(localStorage.getItem("loggedInUser"))
    apiService
    .assignTaskToCompleted(userId,taskId)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error("Error fetching task data:", error);
    });
  }

  const saveAudioToAPI = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
    apiService
    .saveAudioBlobToStorage(selectedTask.uploadUrl,audioBlob)
    .then((result) => {
      console.log("Audio saved to the API.");
        assignTaskToCompleted(selectedTask.taskId)
        history.push("/dashboard/tasks/completed");
    })
    .catch((error) => {
      console.error("Error fetching task data:", error);
    });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon onClick={goBack} icon={arrowBack} />
          </IonButtons>
          <IonTitle className="ion-text-center">
            {t(`dcag.tasks.page.heading`)}
          </IonTitle>
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
          <h2 className="no-padding-margin" style={{ marginBottom: "8px" }}>
            {selectedTask.taskName}
          </h2>
          <p className="no-padding-margin" style={{ fontSize: "0.9rem" }}>
            <samll>
              {t(`dcag.tasks.createdAt.label`)}: {formatDate(selectedTask.createDateTime)}{" "}
              {t(`dcag.tasks.dueDate.label`)}: {formatDate(selectedTask.dueDateTime)}
            </samll>
          </p>
          <p className="no-padding-margin">
            <span style={{ fontSize: "0.9rem" }}>
              {t(`dcag.tasks.payouts.label`)}:
            </span>{" "}
            <span style={{ fontWeight: "600" }}>${selectedTask.price}</span>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "10px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          {(selectedTask.taskType === "TEXT_TO_AUDIO" ||
            selectedTask.taskType === "TEXT_TO_AUDIO") && (
            <div>
              <IonLabel className="label-with-margin">
                {t(`dcag.tasks.performTask.input.label`)}
              </IonLabel>
              <Textarea
                value={selectedTask.input}
                style={{ marginTop: "10px" }}
                rows="1"
                overrides={{
                  Root: {
                    style: () => ({
                      marginTop: "10px",
                    }),
                  },
                }}
              />
              {/* <IonTextarea
                style={{
                  background: "#f3f3f3", // Set the grey background color
                  height: "200px", // Set the desired height// Set the desired width
                  padding: "10px",
                  marginBottom: "11px", // Optional padding
                  borderRadius: "10px",
                }}
                value={selectedTask.input}
              ></IonTextarea> */}
            </div>
          )}
          {(selectedTask.taskType === "AUDIO_TO_AUDIO" ||
            selectedTask.taskType === "AUDIO_TO_AUDIO") && (
            <div>
              <h5>{t(`dcag.tasks.performTask.input.label`)}</h5>
              <AudioPlayer audioSrc={selectedTask.inputUrl} />
            </div>
          )}

          {/* Label for Audio Recording */}
          {selectedTask.status === "IN_PROGRESS" && (
            <IonLabel
              className="label-with-margin"
              style={{ marginTop: "20px" }}
            >
              {t(`dcag.tasks.performTask.recordAudio.label`)}
            </IonLabel>
          )}
          <div style={{ marginTop: "10px" }}>
            {/* Display the recorded audio for playback (Step 4) */}
            {audioChunks.length > 0 && (
              <AudioPlayer
                audioSrc={URL.createObjectURL(
                  new Blob(audioChunks, { type: "audio/mpeg" })
                )}
              />
            )}
            {selectedTask.status === "COMPLETED" && (
              <div>
                <h5>{t(`dcag.tasks.performTask.output.label`)}</h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "",
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
                      width: "80vw",
                    }}
                  >
                    <AudioPlayer audioSrc={selectedTask.outputUrl} />
                  </div>
                  {/* <div className="icon-container">
                    <div className="icon">
                      <IonIcon icon={pencil}></IonIcon>
                    </div>
                    <div className="icon">
                      <IonIcon icon={trash}></IonIcon>
                    </div>
                  </div> */}
                </div>
              </div>
            )}
          </div>

          {/* Centered Audio Recording Component */}
          {(selectedTask.status === "IN_PROGRESS" || selectedTask.status === "IN_PROGRESS") && (
            <div style={{ width: "100%", marginTop: "10px" }}>
              {isRecording ? (
                <div
                  style={{
                    height: "200px",
                    backgroundColor: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <div style={audioRecordingStyle} onClick={stopRecording}>
                    <span>Recording in progress...</span>
                    <div
                      className="tap-save-container"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <IonIcon icon={saveOutline} className="tap-save-icon" />
                    </div>
                    <span className="save-text">
                      {t(`dcag.home.btn.tapToSave.label`)}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      height: "200px",
                      backgroundColor: "#f3f3f3",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    <div style={audioRecordingStyle}>
                      <div>
                        <IonIcon
                          icon={micOutline}
                          style={{ fontSize: "4rem", color: "#467ff4" }}
                        ></IonIcon>
                      </div>
                      <Button
                        shape={SHAPE.pill}
                        size={SIZE.compact}
                        disabled={selectedTask.status === "COMPLETED"}
                        onClick={startRecording}
                      >
                        {t(`dcag.home.btn.startRecording.label`)}
                      </Button>
                      {/* <IonButton
                      expand="block"
                      color="primary"
                      className="ion-small"
                      disabled={selectedTask.status === "Completed"}
                    >
                      Start Recording
                    </IonButton> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* <div className="button-container">
            <IonButton
              expand="block"
              color="primary"
              className="signup-login-button"
              onClick={(e) => saveAudioToAPI(e)}
              disabled={selectedTask.status === "Completed"}
            >
              Submit
            </IonButton>
            {isRecording && (
              <IonButton
                expand="block"
                color="secondary"
                className="signup-login-button"
                disabled={selectedTask.status === "Completed"}
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
          </div> */}
          {(selectedTask.status === "IN_PROGRESS" || selectedTask.status === "IN_PROGRESS") && (
            <ButtonDock
              overrides={{
                Root: {
                  style: () => ({
                    paddingLeft: "0px",
                    paddingRight: "0px",
                  }),
                },
              }}
              primaryAction={
                <Button
                  onClick={(e) => saveAudioToAPI(e)}
                  disabled={
                    selectedTask.status === "COMPLETED" ||
                    audioChunks.length === 0 ||
                    submitted === true
                  }
                >
                  {t(`dcag.home.btn.submit.label`)}
                </Button>
              }
              secondaryActions={[
                <Button
                  kind={KIND.secondary}
                  key="first"
                  onClick={(e) => history.push("/dashboard/help")}
                  disabled={selectedTask.status === "COMPLETED"}
                >
                  {t(`dcag.home.btn.help.label`)}
                </Button>,
              ]}
              dismissiveAction={
                <Button
                  kind={KIND.tertiary}
                  onClick={(e) => history.push("/dashboard/tasks")}
                >
                  {t(`dcag.home.btn.cancel.label`)}
                </Button>
              }
            />
          )}
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
  // height: "100px",
  color: "#fff",
  // width: "100px",
  borderRadius: "50%",
  gap: "2px",
};

export default PerformTask;
