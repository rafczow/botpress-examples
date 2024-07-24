FilePond.parse(document.body);
https://pqina.nl/filepond/docs/api/instance/properties/

/**
 * Upload functions
 */ 
function openPopup() {
    document.getElementById("uploadPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("uploadPopup").style.display = "none";
}

function cancelUpload() {
    closePopup();
    window.botpressWebChat.sendPayload({
        type: 'trigger',
        payload: {
            action: 'upload_canceled',
        },
    });
}

function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
        console.log("Uploading file:", file.name);
        // 1. Send the files to a server
        // ...

        // 2. on success send payload and images
        // foreach image
        window.botpressWebChat.sendPayload({
            "type": "image",
            "title": "ducky duck duck",
            "image": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Mallard2.jpg",
            "typing": true
        });
        // once done
        window.botpressWebChat.sendPayload({
            type: 'trigger',
            payload: {
                action: 'upload_success',
            },
        });

        // 3. close popup
        closePopup();
    } else {
        alert("Please select a file to upload.");
    }
}

/**
 * Custom triggers
 */ 

// Listen for the custom event to show the File Upload Modal
window.botpressWebChat.onEvent(event => {
    if (event.type === 'TRIGGER') {
      if (event.value && event.value.action === 'upload') {
        this.openPopup();
      }
    }
}, ['TRIGGER']);
