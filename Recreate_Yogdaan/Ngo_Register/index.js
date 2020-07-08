var firebaseConfig = {
    apiKey: "AIzaSyCcd02Dsm38Qt_y260JhEKfFteyZqiIvlM",
    authDomain: "yogdaan-268ac.firebaseapp.com",
    databaseURL: "https://yogdaan-268ac.firebaseio.com",
    projectId: "yogdaan-268ac",
    storageBucket: "yogdaan-268ac.appspot.com",
    messagingSenderId: "812802346911",
    appId: "1:812802346911:web:b623a1cf5876a9c17037aa",
    measurementId: "G-NCG8WRJN1J"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  firebase.auth.Auth.Persistence.LOCAL
  $("#btn-signup").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      if(email != "" && password != "")
    {
        console.log("inside");
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            document.getElementById("reg").textContent="Registering";
            console.log('hit finally');
            //SAVING DATA
            const form = document.querySelector('#formReg');
            db.collection('CollectionNgo').doc(document.getElementById('email').value).set({
                Name: document.getElementById('Name').value,
                Number: document.getElementById('Phone number').value,
                Userid: document.getElementById('email').value,
                City: document.getElementById('City').value,
                State: document.getElementById('State').value,
                Work: document.getElementById('Field of Work').value
            });
            
            window.location.href = "#";
            document.getElementById("reg").textContent="";
        }).catch(function(error)
        {
            console.log('hit hahah');
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });
            console.log("present");
    }
    else
    {
        window.alert("Form is incomplete . Please fill out all fields.");
    }
  });
  