import AgoraRTC from "agora-rtc-sdk-ng";

let options = {
  // Pass your App ID here.
  appId: process.env.REACT_APP_AGORA_APP_ID,
  // Set the channel name.
  // Pass your temp token here.
};

let channelParameters = {
  // A variable to hold a local audio track.
  localAudioTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
  // A variable to hold the remote user id.
  remoteUid: null,
};

// Create an instance of the Agora Engine
const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
agoraEngine.on("user-published", async (user, mediaType) => {
  // Subscribe to the remote user when the SDK triggers the "user-published" event.
  await agoraEngine.subscribe(user, mediaType);
  console.log("subscribe success");
  // Subscribe and play the remote audio track.
  if (mediaType == "audio") {
    channelParameters.remoteUid = user.uid;
    // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
    channelParameters.remoteAudioTrack = user.audioTrack;
    // Play the remote audio track.
    channelParameters.remoteAudioTrack.play();
    console.log("Remote user connected: " + user.uid);
  }

  // Listen for the "user-unpublished" event.
  agoraEngine.on("user-unpublished", (user) => {
    console.log(user.uid + "has left the channel");
  });
});

export const joinAgora = async (token, channel, userId) => {
  // Join a channel.
  await agoraEngine.join(options.appId, channel, token, userId);
  console.log("joined");
  // Create a local audio track from the microphone audio.
  channelParameters.localAudioTrack =
    await AgoraRTC.createMicrophoneAudioTrack();
  // Publish the local audio track in the channel.
  await agoraEngine.publish(channelParameters.localAudioTrack);
  console.log("Publish success!");
};

export const mute = (isMuteAudio) => {
  if (isMuteAudio === false) {
    // Mute the local audio.
    channelParameters.localAudioTrack.setEnabled(false);
  } else {
    // Unmute the local audio.
    channelParameters.localAudioTrack.setEnabled(true);
  }
};
