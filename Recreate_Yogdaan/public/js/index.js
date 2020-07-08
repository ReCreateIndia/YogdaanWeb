var firebaseConfig = {
    apiKey: "AIzaSyCcd02Dsm38Qt_y260JhEKfFteyZqiIvlM",
    authDomain: "yogdaan-268ac.firebaseapp.com",
    databaseURL: "https://yogdaan-268ac.firebaseio.com",
    projectId: "yogdaan-268ac",
    storageBucket: "yogdaan-268ac.appspot.com",
    messagingSenderId: "812802346911",
    appId: "1:812802346911:web:b623a1cf5876a9c17037aa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth.Auth.Persistence.LOCAL
  function SeedDB()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      if(email != "" && password != "")
    {
        document.getElementById("final").textContent = "Logging You In...";
        console.log("inside");
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            console.log('hit finally');
            console.log(firebase.auth().currentUser);
            window.location.href = "/request";
            
        }).catch(function(error)
        {
            document.getElementById("final").textContent = "Wrong Credential";
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
  }
  
  $("#btn-resetPassword").click(function()
  {
      var auth = firebase.auth();
      var email = $("#email").val();
      
      if(email !="")
      {
          auth.sendPasswordResetEmail(email).then(function()
          {
             window.alert("Email has been sent to you,Please check and verify.");
          }).catch(function(error)
        {
           var errorCode = error.code;
           var errorMessage = error.message;

           console.log(errorCode);
           console.log(errorMessage);

           window.alert("Message : " + errorMessage);
           
           
        });
      }
      else
      {
          window.alert("Please write your username first.");
      }
  });

