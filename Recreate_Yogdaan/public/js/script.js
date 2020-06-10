//UPLOAD FILE
function upload(){
    //get your select image
    var image = document.getElementById("image").files[0];
    //now get your image name
    var imageName = image.name;
    //firebase storage reference
    //it is the path where your image will store
    var storageRef = firebase.storage().ref('blogs/'+ imageName);
    //upload image to selected storage reference 
    var uploadTask = storageRef.put(image);

    uploadTask.on('state_changed', function(snapshot){
        //observe state change events such as progress, pause, resume
        document.getElementById("upload").textContent = "Please Wait While Uploading...";
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        document.getElementById("myprogress").value = progress;
        if(progress === 100){
            document.getElementById("upload").textContent = "Uploaded Successfully";
        }
    },function(error){
        console.log(error.message);
    },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log(document.getElementById("pic").value);
            document.getElementById("pic").value =  downloadURL;
            console.log(downloadURL);
        });
    });
}