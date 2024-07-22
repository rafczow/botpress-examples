/**
 * Upload popup navigation
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
        payload: { action: 'upload_canceled' }
    });
}

function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
        // Here you would typically send the file to a server
        console.log("Uploading file:", file.name);
        // For this example, we'll just close the popup
        closePopup();

        window.botpressWebChat.sendPayload({
            type: 'trigger',
            payload: { action: 'upload_success' }
        });
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




// next step:
https://youtu.be/9U3jy-FidJ4?t=498