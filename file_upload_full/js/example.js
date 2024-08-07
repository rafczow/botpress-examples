/**
 * Utility
 */ 
function openPopup() {
    document.getElementById("import-popup").style.display = "block";
}

function closePopup() {
  document.getElementById("uploadPopup").style.display = "none";
}

/**
 * Custom triggers
 */ 

// Listen for the custom event to show the file upload modal
window.botpressWebChat.onEvent(event => {
    if (event.type === 'TRIGGER') {
      if (event.value && event.value.action === 'upload') {
        this.openPopup();
      }
    }
}, ['TRIGGER']);

function cancelUpload() {
    window.botpressWebChat.sendPayload({
        type: 'trigger',
        payload: {
            action: 'upload_canceled',
        },
    });
}

/**
 * ai
 */ 
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('import-popup');
    const dropArea = document.getElementById('drop-area');
    const fileProgress = document.getElementById('file-progress');
    const fileName = document.getElementById('file-name');
    const progress = document.getElementById('progress');
    const progressPercent = document.getElementById('progress-percent');
    const urlInput = document.getElementById('url-input');
    const urlUploadBtn = document.getElementById('url-upload-btn');
    const discardBtn = document.getElementById('discard-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const fileDoneTemplate = document.getElementById('file-done-template');
    const fileList = document.getElementById('file-list');
    const maxFileSize = 4 * 1024 * 1024; // 4 MB max
  
    // Drag and drop functionality
    dropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropArea.classList.add('dragover');
    });
  
    dropArea.addEventListener('dragleave', () => {
      dropArea.classList.remove('dragover');
    });
  
    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.classList.remove('dragover');
      handleFile(e.dataTransfer.files);
    });
  
    dropArea.addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.csv';
      fileInput.click();
      fileInput.addEventListener('change', (e) => {
        handleFile(e.target.files);
      });
    });

    // Url upload functionality
    // todo: add validation on change
    urlUploadBtn.addEventListener('click', () => {
      const url = urlInput.value.trim();
      if (url) {
        // Handle URL upload
        console.log('Uploading from URL:', url);
      }
    });
  
    // File handling
    const serverUpload = new Promise((resolve, reject) => {
      // todo: send the file to a server, return uid
      setTimeout(() => {
        resolve("Success!");
      }, 2250);
    });

    function handleFile(files) {
      if (files.length > 0) {
        // todo: add foreach file
        const file = files[0];
        if (file.size <= maxFileSize) {
          showFileProgress(file);
          simulateUpload();

          serverUpload.then(() => {
            // On success
            hideFileProgress();
            addFileDone(file);
          }).catch(() => {
            // On failure
            alert('File upload error.')
          });
        } else {
          alert('File size exceeds 4 MB limit.');
        }
      }
    }

    function finishUpload() {
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
    }
  
    function showFileProgress(file) {
      let fileSize = `(${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      fileName.textContent = file.name + ' ' + fileSize;
      fileProgress.style.display = 'block';
    }
  
    function hideFileProgress() {
      fileProgress.style.display = 'none';
    }

    function addFileDone(file) {
      let template = fileDoneTemplate.cloneNode(true);

      template.querySelector('#file-name').textContent = file.name;
      template.style.display = 'flex';
      
      fileList.appendChild(template);
    }

    function simulateUpload() {
      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        progress.style.width = `${percent}%`;
        progressPercent.textContent = `${percent}%`;
        if (percent >= 90) {
          clearInterval(interval);
        }
      }, 200);
    }
  
    // Actions
    discardBtn.addEventListener('click', () => {
      cancelUpload();
      closePopup();
    });

    uploadBtn.addEventListener('click', () => {
      // Handle import action
      console.log('Importing data');
    });
});