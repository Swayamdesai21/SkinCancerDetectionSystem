// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [image, setImage] = useState(null);
//   const [prediction, setPrediction] = useState("");
//   const [selectedModel, setSelectedModel] = useState("");

//   const handleFileChange = (event) => {
//     setImage(event.target.files[0]);
//   };

//   const handlePredict = async () => {
//     if (!image || selectedModel !== "Skin Cancer Detection") {
//       alert("Please select the correct model and upload an image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", image);

//     console.log("123 :", formData)

//     const reader = new FileReader();
//     reader.readAsDataURL(image); // Convert image to Base64

//     reader.onload = () => {
//       localStorage.setItem("userImage", reader.result); // Store in localStorage
//       console.log("Image saved in localStorage!");
//     };


//     try {
//       const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log(response.data.prediction)
//       setPrediction(response.data.prediction);
//     } catch (error) {
//       console.error("Error:", error);
//       setPrediction("Error in prediction.");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Skin Cancer Detection</h1>

//       <select onChange={(e) => setSelectedModel(e.target.value)}>
//         <option value="">Select Model</option>
//         <option value="Skin Cancer Detection">Skin Cancer Detection</option>
//       </select>

//       {selectedModel === "Skin Cancer Detection" && (
//         <>
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//           <button onClick={handlePredict}>Predict</button>
//           {prediction && <h2>Prediction: {prediction}</h2>}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;






// working

// import React, { useState } from "react";
// import axios from "axios";


// function App() {
//   const [image, setImage] = useState(null);
//   const [prediction, setPrediction] = useState("");
//   const [selectedModel, setSelectedModel] = useState("");
//   const [imagePreview, setImagePreview] = useState(null); // For previewing the uploaded image

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setImage(file);

//     // Convert image to Base64 for local storage & backend
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => {
//       localStorage.setItem("userImage", reader.result); // Save in localStorage
//       setImagePreview(reader.result); // Show image preview
//     };
//   };

//   const handlePredict = async (event) => {
//     event.preventDefault();

//     if (!image) {  // ✅ Check if an image is selected
//         alert("Please select an image file.");
//         return;
//     }

//     const formData = new FormData();
//     formData.append("file", image);

//     try {
//         const response = await fetch("http://127.0.0.1:8000/predict", {
//             method: "POST",
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         alert(`Prediction: ${data.prediction}, Confidence: ${data.confidence}`);
//         console.log(data);

//     } catch (error) {
//         console.error("Error:", error);
//         alert("Error making prediction.");
//     }
//  };

//   return (
//     <div className="container">
//       <h1>Skin Cancer Detection</h1>

//       <select onChange={(e) => setSelectedModel(e.target.value)}>
//         <option value="">Select Model</option>
//         <option value="Skin Cancer Detection">Skin Cancer Detection</option>
//       </select>

//       {selectedModel === "Skin Cancer Detection" && (
//         <>
//           <input id="fileUpload" type="file" accept="image/*" onChange={handleFileChange} />

//           {/* Show Image Preview */}
//           {imagePreview && <img src={imagePreview} alt="Uploaded" width="200" />}

//           <button onClick={handlePredict}>Predict</button>
//           {prediction && <h2>Prediction: {prediction}</h2>}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;




import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      localStorage.setItem("userImage", reader.result);
      setImagePreview(reader.result);
    };
  };

  const handlePredict = async (event) => {
    event.preventDefault();

    if (!image) {
        alert("Please select an image file.");
        return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();  // ✅ Get error message from FastAPI
            throw new Error(`HTTP error! Status: ${response.status}, Detail: ${errorData.detail}`);
        }

        const data = await response.json();
        alert(`Prediction: ${data.prediction}, Confidence: ${data.confidence}`);
        console.log(data);

    } catch (error) {
        console.error("❌ Error:", error);
        alert("Error making prediction: " + error.message);
    }
};

  return (
    <div className="container">
      <h1>Skin Cancer Detection</h1>

      <select onChange={(e) => setSelectedModel(e.target.value)}>
        <option value="">Select Model</option>
        <option value="Skin Cancer Detection">Skin Cancer Detection</option>
      </select>

      {selectedModel === "Skin Cancer Detection" && (
        <>
          {/* ✅ Add ID to file input */}
          <input id="fileUpload" type="file" accept="image/*" onChange={handleFileChange} />

          {imagePreview && <img src={imagePreview} alt="Uploaded" width="200" />}

          <button onClick={handlePredict}>Predict</button>
          {prediction && <h2>Prediction: {prediction}</h2>}
        </>
      )}
    </div>
  );
}

export default App;
