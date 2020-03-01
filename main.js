// Called after form input is processed
function startConnect() {
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    
    // Initialize new Paho client connection
    client = new Paho.MQTT.Client("192.168.1.20", Number(9001), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
    });
}

// Called when the client connects
function onConnect() {
    
    // Print output for the user in the messages div
    // document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Subscribe to the requested topic
    // client.subscribe([("P1/#", 0),("P1/controller/registration", 0)])
    client.subscribe("/HouseSensorData/Temperature",2);
    client.subscribe("/GarageSensorData/Temperature",2);
    client.subscribe("/HouseSensorData/Humidity",2);
    client.subscribe("/Weather/OutsideTemp",2);
    client.subscribe("/Alarm/Zone5/Switch",2);
    client.subscribe("/Alarm/Zone4/Switch",2);
    client.subscribe("/Alarm/Zone8/Switch",2);
    client.subscribe("/Alarm/Zone9/Switch",2);
    client.subscribe("power/volts",2);
    
   
    
    

    // client.subscribe("/GarageSensorData/House");
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    // document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        // document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString);
    console.log("Topic: " + message.destinationName);
    // document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    if (message.destinationName == "/GarageSensorData/Temperature") {
        g1.refresh(message.payloadString);
      }
      if (message.destinationName == "/HouseSensorData/Temperature") {
        g2.refresh(message.payloadString);
      }
      if (message.destinationName == "/HouseSensorData/Humidity") {
        g3.refresh(message.payloadString);
      }
      if (message.destinationName == "/Weather/OutsideTemp") {
        g4.refresh(message.payloadString);
      }
      if (message.destinationName == "power/volts") {
        g5.refresh(message.payloadString);
      }
      if (message.destinationName == "/Alarm/Zone5/Switch") {
          if (message.payloadString == "1"){
            document.getElementById("basementMotionStatus").innerText = "Motion";
            document.getElementById("basementMotionStatus").style.color = "red";
          }
          if (message.payloadString == "0"){
            document.getElementById("basementMotionStatus").innerText = "No Motion";
            document.getElementById("basementMotionStatus").style.color = "green";
          }
       }
       if (message.destinationName == "/Alarm/Zone4/Switch") {
        if (message.payloadString == "1"){
          document.getElementById("hallwayMotionStatus").innerText = "Motion";
          document.getElementById("hallwayMotionStatus").style.color = "red";
        }
        if (message.payloadString == "0"){
          document.getElementById("hallwayMotionStatus").innerText = "No Motion";
          document.getElementById("hallwayMotionStatus").style.color = "green";
        }
      }
      if (message.destinationName == "/Alarm/Zone8/Switch") {
        if (message.payloadString == "0"){
          document.getElementById("livingroomMotionStatus").innerText = "Motion";
          document.getElementById("livingroomMotionStatus").style.color = "red";
        }
        if (message.payloadString == "1"){
          document.getElementById("livingroomMotionStatus").innerText = "No Motion";
          document.getElementById("livingroomMotionStatus").style.color = "green";
        }
      }
      if (message.destinationName == "/Alarm/Zone9/Switch") {
        if (message.payloadString == "0"){
          document.getElementById("kitchenMotionStatus").innerText = "Motion";
          document.getElementById("kitchenMotionStatus").style.color = "red";
        }
        if (message.payloadString == "1"){
          document.getElementById("kitchenMotionStatus").innerText = "No Motion";
          document.getElementById("kitchenMotionStatus").style.color = "green";
        }
      }
       
    
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    // document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}