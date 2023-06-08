// Cargar la librería Face-API.js
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'), //tiene que estar si o si, sino no carga las demas.
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
  ]).then(start);
  
  // Función para iniciar el reconocimiento facial
  function start() {
    // Obtener el elemento de entrada de imagen
    const input = document.getElementById('imageInput');
    input.addEventListener('change', onImageSelected);
  }
  
  
  // Función para manejar la selección de imagen
  function onImageSelected() {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = async function(event) {
      const image = document.createElement('img');
      image.src = event.target.result;
      image.onload = async function() {

        // Eliminar las imágenes anteriores
      const previousCanvases = document.querySelectorAll('canvas');
      previousCanvases.forEach(canvas => canvas.remove());
        
        // Crear un elemento canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;

        // Detectar los rostros en la imagen
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceExpressions();
  
        // Dibujar la imagen y los resultados en el canvas
        context.drawImage(image, 0, 0);
        faceapi.draw.drawDetections(canvas, detections);
        faceapi.draw.drawFaceLandmarks(canvas, detections);
        
        // Mostrar el canvas en la página
        document.body.appendChild(canvas);

        
      };
    };
    reader.readAsDataURL(file);
  }
  